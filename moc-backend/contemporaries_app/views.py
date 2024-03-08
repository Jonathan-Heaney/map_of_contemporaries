from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, HttpResponseNotFound
from .models import FamousPerson
from django.db.models import Q
import random
import urllib.parse
from collections import namedtuple


# Function to generate Wikipedia links for famous people
def generate_wikipedia_link(name):
    formatted_name = urllib.parse.quote(name.replace(" ", "_"))
    return f"https://en.wikipedia.org/wiki/{formatted_name}"


# Function to retrieve a random person from the database
def random_person(request):
    # Get the minimum hpi from request parameters, default to 50 if not provided
    min_hpi = int(request.GET.get('min_hpi', 50))

    # Filter valid persons directly, reducing database hits by calling 'all()' once
    valid_persons = FamousPerson.objects.exclude(
        birthyear__isnull=True
    ).exclude(
        deathyear__isnull=True
    ).filter(
        hpi__gte=min_hpi
    )

    person_count = valid_persons.count()
    if person_count == 0:
        # Handle case where no persons meet the criteria
        return HttpResponseNotFound({'error': 'No persons found matching criteria'})

    random_index = random.randint(0, person_count - 1)
    person = valid_persons[random_index]  # Direct indexing on the queryset

    # Utilize the prepare_person_data function to construct response data
    response_data = prepare_person_data(person)

    return JsonResponse(response_data)


OverlapResult = namedtuple(
    'OverlapResult', ['percentage', 'start', 'end', 'years'])


def calculate_overlap(person1, person2):
    if None in (person1.birthyear, person1.deathyear, person2.birthyear, person2.deathyear):
        return OverlapResult(0, 0, 0, 0)

    latest_start = max(person1.birthyear, person2.birthyear)
    earliest_end = min(person1.deathyear, person2.deathyear)
    overlap_years = max(0, earliest_end - latest_start)
    person1.lifespan = person1.deathyear - person1.birthyear
    percentage = (overlap_years / person1.lifespan) * \
        100 if person1.lifespan > 0 else 0
    percentage = round(percentage, 2)

    return OverlapResult(percentage, latest_start, earliest_end, overlap_years)


def prepare_person_data(person, extra_data=None):
    extra_data = extra_data or {}
    wikipedia_link = generate_wikipedia_link(person.name)
    person_data = {
        'id': person.id,
        'name': person.name,
        'occupation': person.occupation,
        'birthyear': person.birthyear,
        'deathyear': person.deathyear,
        'hpi': person.hpi,
        'wikipedia_link': wikipedia_link,
    }
    person_data.update(extra_data)
    return person_data


def calculate_overlaps(chosen_person, score_func):
    all_people = FamousPerson.objects.exclude(id=chosen_person.id)
    overlaps = []

    for person in all_people:
        overlap_result = calculate_overlap(chosen_person, person)
        score = score_func(overlap_result, person)
        overlaps.append((person, score, overlap_result))

    return overlaps


def overlap_score(overlap_result, person):
    return overlap_result.percentage


def fame_overlap_score(overlap_result, person):
    return overlap_result.percentage * (person.hpi ** 20)


def top_overlap(request, person_id):
    chosen_person = FamousPerson.objects.get(id=person_id)
    overlaps = calculate_overlaps(chosen_person, overlap_score)
    overlaps.sort(key=lambda x: x[1], reverse=True)
    top_overlaps = overlaps[:10]

    response_data = [prepare_person_data(person, {
        'overlap_score': score,
        'percentage': overlap_result.percentage,
        'start': overlap_result.start,
        'end': overlap_result.end,
        'years': overlap_result.years,
    }) for person, score, overlap_result in top_overlaps]

    return JsonResponse(response_data, safe=False)


def fame_overlap(request, person_id):
    chosen_person = FamousPerson.objects.get(id=person_id)
    fame_overlaps = calculate_overlaps(chosen_person, fame_overlap_score)
    fame_overlaps.sort(key=lambda x: x[1], reverse=True)
    top_fame_overlaps = fame_overlaps[:10]

    response_data = [prepare_person_data(person, {
        'fame_overlap_score': score,
        'percentage': overlap_result.percentage,
        'start': overlap_result.start,
        'end': overlap_result.end,
        'years': overlap_result.years,
    }) for person, score, overlap_result in top_fame_overlaps]

    return JsonResponse(response_data, safe=False)


# Add search functionality
def search_person(request):
    query = request.GET.get('q', '')
    if query:
        results = FamousPerson.objects.filter(Q(name__icontains=query))[
            :10]  # Limit to top 10

        data = [prepare_person_data(person) for person in results]

        return JsonResponse({'results': data})
    else:
        return JsonResponse({'error': 'No query provided'}, status=400)

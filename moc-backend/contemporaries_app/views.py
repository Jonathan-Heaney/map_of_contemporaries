from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import FamousPerson
from django.db.models import Q
import random
import urllib.parse


# Function to generate Wikipedia links for famous people
def generate_wikipedia_link(name):
    formatted_name = urllib.parse.quote(name.replace(" ", "_"))
    return f"https://en.wikipedia.org/wiki/{formatted_name}"


# Function to retrieve a random person from the database
def random_person(request):
    # Get the minimum hpi from request parameters, default to 0 if not provided
    min_hpi = int(request.GET.get('min_hpi', 50))

    valid_persons = FamousPerson.objects.exclude(birthyear__isnull=True).exclude(
        deathyear__isnull=True).filter(hpi__gte=min_hpi)
    person_count = valid_persons.count()
    random_index = random.randint(0, person_count - 1)
    person = valid_persons.all()[random_index]
    person.wikipedia_link = generate_wikipedia_link(person.name)
    return JsonResponse({
        'id': person.id,
        'name': person.name,
        'occupation': person.occupation,
        'birthyear': person.birthyear,
        'deathyear': person.deathyear,
        'hpi': person.hpi,
        'wikipedia_link': person.wikipedia_link
    })


# Helper function to calculate the overlap percentage
def calculate_overlap_percentage(person1, person2):
    # Check for None values in birth and death years
    if None in (person1.birthyear, person1.deathyear, person2.birthyear, person2.deathyear):
        return 0

    latest_start = max(person1.birthyear, person2.birthyear)
    earliest_end = min(person1.deathyear, person2.deathyear)
    overlap = max(0, earliest_end - latest_start)
    person1_lifespan = person1.deathyear - person1.birthyear
    overlap_percentage = (overlap / person1_lifespan) * \
        100 if person1_lifespan > 0 else 0
    return round(overlap_percentage, 2)


def calculate_overlap_start(person1, person2):
    if None in (person1.birthyear, person1.deathyear, person2.birthyear, person2.deathyear):
        return 0

    latest_start = max(person1.birthyear, person2.birthyear)
    return latest_start


def calculate_overlap_end(person1, person2):
    if None in (person1.birthyear, person1.deathyear, person2.birthyear, person2.deathyear):
        return 0

    earliest_end = min(person1.deathyear, person2.deathyear)
    return earliest_end


def top_overlap(request, person_id):
    chosen_person = FamousPerson.objects.get(id=person_id)
    all_people = FamousPerson.objects.exclude(id=person_id)
    overlaps = []

    # Compare each person in the database to the randomly-chosen person
    for person in all_people:
        overlap_percentage = calculate_overlap_percentage(
            chosen_person, person)
        overlap_start = calculate_overlap_start(chosen_person, person)
        overlap_end = calculate_overlap_end(chosen_person, person)
        overlap_years = overlap_end - overlap_start
        overlaps.append((person, overlap_percentage,
                        overlap_start, overlap_end, overlap_years))
        person.wikipedia_link = generate_wikipedia_link(person.name)

    # Sort by overlap percentage and select top 10
    # x[1] is the second item in the tuple, which is the overlap percentage
    # reverse=True to sort the list in descending order,rather than the default which is ascending
    overlaps.sort(key=lambda x: x[1], reverse=True)

    # Take the top 10 elements from the sorted list
    top_overlaps = overlaps[:10]

    response_data = [{
        'id': person.id,
        'name': person.name,
        'overlap_percentage': overlap_percentage,
        'overlap_start': overlap_start,
        'overlap_end': overlap_end,
        'overlap_years': overlap_years,
        'occupation': person.occupation,
        'birthyear': person.birthyear,
        'deathyear': person.deathyear,
        'hpi': person.hpi,
        'wikipedia_link': person.wikipedia_link
    } for person, overlap_percentage, overlap_start, overlap_end, overlap_years in top_overlaps]

    return JsonResponse(response_data, safe=False)


def fame_overlap(request, person_id):
    chosen_person = FamousPerson.objects.get(id=person_id)
    all_people = FamousPerson.objects.exclude(id=person_id)
    fame_overlaps = []

    # Compare each person in the database to the randomly-chosen person
    for person in all_people:
        overlap_percentage = calculate_overlap_percentage(
            chosen_person, person)
        fame_overlap_score = overlap_percentage * (person.hpi ** 20)
        overlap_start = calculate_overlap_start(chosen_person, person)
        overlap_end = calculate_overlap_end(chosen_person, person)
        overlap_years = overlap_end - overlap_start
        fame_overlaps.append((person, fame_overlap_score, overlap_percentage,
                             overlap_start, overlap_end, overlap_years))
        person.wikipedia_link = generate_wikipedia_link(person.name)

    fame_overlaps.sort(key=lambda x: x[1], reverse=True)

    # Take the top 10 elements from the sorted list
    top_fame_overlaps = fame_overlaps[:10]

    response_data = [{
        'id': person.id,
        'name': person.name,
        'overlap_percentage': overlap_percentage,
        'overlap_start': overlap_start,
        'overlap_end': overlap_end,
        'overlap_years': overlap_years,
        'fame_overlap_score': fame_overlap_score,
        'occupation': person.occupation,
        'birthyear': person.birthyear,
        'deathyear': person.deathyear,
        'hpi': person.hpi,
        'wikipedia_link': person.wikipedia_link
    } for person, fame_overlap_score, overlap_percentage, overlap_start, overlap_end, overlap_years in top_fame_overlaps]

    return JsonResponse(response_data, safe=False)


# Add search functionality
def search_person(request):
    query = request.GET.get('q', '')
    if query:
        results = FamousPerson.objects.filter(Q(name__icontains=query))[
            :10]  # Limit to top 10

        for person in results:
            person.wikipedia_link = generate_wikipedia_link(person.name)
        response_data = [{
            'id': person.id,
            'name': person.name,
            'occupation': person.occupation,
            'birthyear': person.birthyear,
            'deathyear': person.deathyear,
            'hpi': person.hpi,
            'wikipedia_link': person.wikipedia_link
        } for person in results]

        return JsonResponse(response_data, safe=False)
    else:
        return JsonResponse({'error': 'No query provided'}, status=400)

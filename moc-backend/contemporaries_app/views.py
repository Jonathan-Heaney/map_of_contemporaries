from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import FamousPerson
import random
import urllib.parse

# Function to generate Wikipedia links for famous people
def generate_wikipedia_link(name):
    formatted_name = urllib.parse.quote(name.replace(" ", "_"))
    return f"https://en.wikipedia.org/wiki/{formatted_name}"


# Function to retrieve a random person from the database
def random_person(request):
    valid_persons = FamousPerson.objects.exclude(birthyear__isnull=True).exclude(deathyear__isnull=True).filter(hpi__gt=90)
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
    overlap_percentage = (overlap / person1_lifespan) * 100 if person1_lifespan > 0 else 0
    return round(overlap_percentage, 2)


def top_overlap(request, person_id):
    chosen_person = FamousPerson.objects.get(id=person_id)
    all_people = FamousPerson.objects.exclude(id=person_id)
    overlaps = []

    # Compare each person in the database to the randomly-chosen person
    for person in all_people:
        overlap_percentage = calculate_overlap_percentage(chosen_person, person)
        overlaps.append((person, overlap_percentage))
    
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
        'occupation': person.occupation,
        'birthyear': person.birthyear,
        'deathyear': person.deathyear,
        'hpi': person.hpi
    } for person, overlap_percentage in top_overlaps]

    return JsonResponse(response_data, safe=False)


def fame_overlap(request, person_id):
    chosen_person = FamousPerson.objects.get(id=person_id)
    all_people = FamousPerson.objects.exclude(id=person_id)
    fame_overlaps = []

    # Compare each person in the database to the randomly-chosen person
    for person in all_people:
        overlap_percentage = calculate_overlap_percentage(chosen_person, person)
        fame_overlap_score = overlap_percentage * (person.hpi ** 20)
        fame_overlaps.append((person, fame_overlap_score, overlap_percentage))

    fame_overlaps.sort(key=lambda x: x[1], reverse=True)

    # Take the top 10 elements from the sorted list
    top_fame_overlaps = fame_overlaps[:10]

    response_data = [{
        'id': person.id,
        'name': person.name,
        'overlap_percentage': overlap_percentage,
        'fame_overlap_score': fame_overlap_score,
        'occupation': person.occupation,
        'birthyear': person.birthyear,
        'deathyear': person.deathyear,
        'hpi': person.hpi
    } for person, fame_overlap_score, overlap_percentage in top_fame_overlaps]

    return JsonResponse(response_data, safe=False)
import csv
from django.core.management.base import BaseCommand
from django.db import transaction
from contemporaries_app.models import FamousPerson

class Command(BaseCommand):
    help = 'Imports famous people from a CSV file'

    def add_arguments(self, parser):
        # Positional argument for the CSV file path
        parser.add_argument('csv_file', type=str, help='Path to the CSV file containing famous people data')

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']
        self.stdout.write(self.style.SUCCESS(f'Importing data from {"Users/jonathanheaney/repos/map_of_contemporaries/contemporaries_app/pantheon.csv"}'))

        with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
            reader = csv.DictReader(csv_file)
            famous_people_list = []

            for row in reader:
                # Convert string boolean values to Python boolean values
                alive_value = True if row['alive'].lower() == 'true' else False
                birthyear_value = None if row['birthyear'] == '' else int(row['birthyear'])
                deathyear_value = None if row['deathyear'] == '' else int(row['deathyear'])
                age_value = None if row['age'] == '' else int(row['age'])
                birthdate_value = None if row['birthdate'] == '' else row['birthdate']
                deathdate_value = None if row['deathdate'] == '' else row['deathdate']
                

                famous_people_list.append(FamousPerson(
                    id=row['id'],
                    name=row['name'],
                    occupation=row['occupation'],
                    gender=row['gender'],
                    alive=alive_value,
                    bplace_name=row['bplace_name'],
                    bplace_country=row['bplace_country'],
                    birthdate=birthdate_value,
                    birthyear=birthyear_value,
                    dplace_name=row['dplace_name'],
                    dplace_country=row['dplace_country'],
                    deathdate=deathdate_value,
                    deathyear=deathyear_value,
                    age=age_value,
                    hpi=float(row['hpi'])
                ))

                # Batch size, e.g., 1000, adjust based on your memory constraints
                if len(famous_people_list) >= 1000:
                    FamousPerson.objects.bulk_create(famous_people_list)
                    famous_people_list = []  # Reset the list

            # Don't forget to insert the last batch if it's less than 1000
            if famous_people_list:
                FamousPerson.objects.bulk_create(famous_people_list)

        self.stdout.write(self.style.SUCCESS('Successfully imported all famous people.'))
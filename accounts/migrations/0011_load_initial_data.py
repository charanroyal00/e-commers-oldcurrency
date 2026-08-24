from django.db import migrations
from django.core.management import call_command
import os

def load_fixture(apps, schema_editor):
    fixture_file = os.path.join(os.path.dirname(__file__), '..', 'fixtures', 'initial_data.json')
    if os.path.exists(fixture_file):
        try:
            call_command('loaddata', fixture_file)
        except Exception as e:
            print(f"Data migration load note: {e}")

def reverse_code(apps, schema_editor):
    pass

class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_rename_ordered_at_order_created_at_and_more'),
    ]

    operations = [
        migrations.RunPython(load_fixture, reverse_code),
    ]

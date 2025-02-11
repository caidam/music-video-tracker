# base/api/tests/test_database.py

from django.conf import settings
from django.test import TestCase

class DatabaseTest(TestCase):
    def test_database_backend(self):
        self.assertEqual(settings.DATABASES['default']['ENGINE'], 'django.db.backends.sqlite3')

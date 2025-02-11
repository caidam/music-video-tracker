from django.test import TestCase
from django.contrib.auth.models import User
from base.models import Source, UserSource
from django.utils import timezone

class SourceModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='user@example.com', password='testpass123')
        self.source = Source.objects.create(url='http://example.com', type='youtube', added_by=self.user)

    def test_source_creation(self):
        self.assertEqual(self.source.url, 'http://example.com')
        self.assertEqual(self.source.type, 'youtube')
        self.assertEqual(self.source.added_by, self.user)
        self.assertIsNotNone(self.source.date_added)

    def test_source_str(self):
        self.assertEqual(str(self.source), 'http://example.com')

    def test_source_unique_url(self):
        with self.assertRaises(Exception):
            Source.objects.create(url='http://example.com', type='youtube', added_by=self.user)

    # def test_source_invalid_type(self):
    #     invalid_source = Source(url='http://example.com', type='invalid', added_by=self.user)
    #     with self.assertRaises(ValueError):
    #         invalid_source.full_clean()

    def test_source_default_values(self):
        source = Source(url='http://example2.com', type='youtube', added_by=self.user)
        source.save()
        self.assertIsNotNone(source.date_added)

class UserSourceModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='user@example.com', password='testpass123')
        self.source = Source.objects.create(url='http://example.com', type='youtube', added_by=self.user)
        self.usersource = UserSource.objects.create(user=self.user, source=self.source)

    def test_usersource_creation(self):
        self.assertEqual(self.usersource.user, self.user)
        self.assertEqual(self.usersource.source, self.source)
        self.assertIsNotNone(self.usersource.date_started)
        self.assertIsNone(self.usersource.date_stopped)
        self.assertIsNotNone(self.usersource.updated_at)

    def test_usersource_update_date_stopped(self):
        self.usersource.date_stopped = timezone.now()
        self.usersource.save()
        self.assertIsNotNone(self.usersource.date_stopped)

    def test_usersource_str(self):
        self.assertEqual(str(self.usersource), f'{self.user.username} - {self.source.url}')

from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from base.models import Source, UserSource
from rest_framework_simplejwt.tokens import RefreshToken

class UserTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='user@example.com', password='testpass123')
        self.url = reverse('user-list')

    def test_register_user(self):
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpass123'
        }
        response = self.client.post(reverse('register'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_user(self):
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(reverse('token_obtain_pair'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def get_token_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
        }

class SourceTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='user@example.com', password='testpass123')
        self.source = Source.objects.create(url='http://example.com', type='youtube', added_by=self.user)
        self.other_source = Source.objects.create(url='http://otherexample.com', type='spotify', added_by=None)
        self.url = reverse('source-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.get_token_for_user(self.user)['access'])

    def get_token_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
        }

    def test_create_source(self):
        data = {
            'url': 'http://newsource.com',
            'type': 'spotify',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # def test_list_sources(self):
    #     self.url = reverse('source-list')
    #     response = self.client.get(self.url, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     print(response.json())
    #     self.assertGreaterEqual(len(response.json()), 1)

    def test_stop_tracking_source(self):
        usersource = UserSource.objects.create(user=self.user, source=self.source)
        url = reverse('usersource-stop-tracking', args=[usersource.id])
        response = self.client.post(url, {'source_url': self.source.url}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        usersource.refresh_from_db()
        self.assertIsNotNone(usersource.date_stopped)

    def test_random_url(self):
        response = self.client.get(reverse('random_url'), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.json())
        self.assertIn('url', response.json())

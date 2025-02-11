from rest_framework.test import APITestCase
from base.models import Source
from base.api.serializers import SourceSerializer
from django.contrib.auth.models import User

class SourceSerializerTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='user@example.com', password='testpass123')
        self.source_data = {
            'url': 'http://example.com',
            'type': 'youtube',
            'added_by': self.user.id
        }
        self.serializer = SourceSerializer(data=self.source_data)

    def test_source_serializer_valid(self):
        self.assertTrue(self.serializer.is_valid())

    def test_source_serializer_invalid(self):
        invalid_data = self.source_data.copy()
        invalid_data['url'] = ''
        serializer = SourceSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())

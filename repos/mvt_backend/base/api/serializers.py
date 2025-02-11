from rest_framework.serializers import ModelSerializer, ValidationError
from base.models import Note, Source, UserSource
from django.contrib.auth.models import User

#

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("This email address is already in use")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.is_active = False
        user.save()
        return user

#

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

#
class SourceSerializer(ModelSerializer):
    class Meta:
        model = Source
        # fields = ['url', 'type', 'added_by', 'date_added']
        fields = '__all__'

class UserSourceSerializer(ModelSerializer):
    class Meta:
        model = UserSource
        # fields = ['user', 'source', 'date_started', 'date_stopped']
        fields = '__all__'
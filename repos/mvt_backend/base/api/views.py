from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.generics import DestroyAPIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User
from django.utils import timezone
from base.models import Note, Source, UserSource
from .serializers import NoteSerializer, SourceSerializer, UserSourceSerializer, UserSerializer

from decouple import config
import random

# email verification
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
#

# data processing api
from .api_helpers import make_data_api_request

#########################################
# AUTH

BASE_URL_FRONT = config('BASE_URL_FRONT')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]


    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

#########################################
## EMAIL VERIFICATION
def generate_token_and_send_email(user):
    token = PasswordResetTokenGenerator().make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    # activation_link = f'http://localhost:5173/activate/{uid}/{token}'
    endpoint = f'{uid}/{token}'
    activation_link = f"{BASE_URL_FRONT}/activate/{endpoint}"

    send_mail(
        'Activate your account',
        f'Click the link to activate your account: {activation_link}',
        'from@example.com',
        [user.email],
    )

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.is_active = False
        user.save()

        token = PasswordResetTokenGenerator().make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        # activation_link = f'http://localhost:5173/activate/{uid}/{token}'
        endpoint = f'{uid}/{token}'
        activation_link = f"{BASE_URL_FRONT}/#/activate/{endpoint}"

        send_mail(
            'Activate your account',
            f'Hello {user.username}, Click the link to activate your account: {activation_link}',
            'from@example.com',
            [user.email],
        )
        return Response({'detail': 'Verification email has been sent'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
##
@api_view(['GET'])
def activate_account(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)

        if not PasswordResetTokenGenerator().check_token(user, token):
            return Response({'detail': 'Token is invalid'}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = True
        user.save()

        return Response({'detail': 'Account activated.'})

    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({'detail': 'Something went wrong.'}, status=status.HTTP_400_BAD_REQUEST)

#########################################
#### PASSWORD RESET
@api_view(['POST'])
def request_password_reset(request):
    email = request.data.get('email')
    user = User.objects.filter(email=email).first()

    if not user:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if not user.is_active:
        generate_token_and_send_email(user)
        return Response({'detail': 'Account is not active. Verification email has been resent.'})

    token = PasswordResetTokenGenerator().make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    # reset_link = f'http://localhost:5173/reset-password-confirm/{uid}/{token}'
    endpoint = f'{uid}/{token}'
    reset_link = f"{BASE_URL_FRONT}/#/reset-password-confirm/{endpoint}"

    send_mail(
        'Password Reset Request',
        f'Hello {user.username}, Click the link to reset your password: {reset_link}',
        'from@example.com',
        [email],
    )
    return Response({'detail': 'Password reset email has been sent.'})
##
@api_view(['POST'])
def reset_password_confirm(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)

        if not PasswordResetTokenGenerator().check_token(user, token):
            return Response({'detail': 'Token is invalid'}, status=status.HTTP_400_BAD_REQUEST)

        password = request.data.get('password')
        user.set_password(password)
        user.save()

        return Response({'detail': 'Password has been reset.'})

    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({'detail': 'Something went wrong.'}, status=status.HTTP_400_BAD_REQUEST)
#####

#########################################
# MODELS
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id)

    def create(self, validated_data):
        # Allow any user (authenticated or not) to create a new user
        return super().create(validated_data)

    #####
    # DELETE ACCOUNT
class DeleteAccountView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({"detail": "Account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

####

class SourceViewSet(viewsets.ModelViewSet):
    queryset = Source.objects.all()
    serializer_class = SourceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Filter sources based on the UserSource relation for the authenticated user
        return Source.objects.filter(usersource__user=user, usersource__date_stopped__isnull=True).order_by('-usersource__updated_at')

class UserSourceViewSet(viewsets.ModelViewSet):
    serializer_class = UserSourceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return UserSource.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        source_url = request.data.get('source_url')

        # Get the authenticated user
        authenticated_user = request.user

        # Try to get the source object
        source, created = Source.objects.get_or_create(url=source_url, defaults={'added_by': authenticated_user})

        # Try to get the UserSource relation
        try:
            usersource = UserSource.objects.get(user=user, source=source)
            if usersource.date_stopped is not None:
                # If the user has stopped tracking the source, set date_stopped to None
                usersource.date_stopped = None
                usersource.updated_at = timezone.now() 
                usersource.save()
                return Response({'status': 'source retracked'}, status=status.HTTP_200_OK)
        except UserSource.DoesNotExist:
            # If the UserSource relation does not exist, create a new one
            UserSource.objects.create(user=user, source=source)
            return Response({'status': 'source tracked'}, status=status.HTTP_201_CREATED)

    # test stop tracking logic
    @action(detail=True, methods=['post'])
    def stop_tracking(self, request, pk=None):
        user = request.user
        source_url = request.data.get('source_url')

        # Get the authenticated user
        authenticated_user = request.user

        # Try to get the source object
        source, created = Source.objects.get_or_create(url=source_url, defaults={'added_by': authenticated_user})

        # Try to get the UserSource relation
        try:
            usersource = UserSource.objects.get(user=user, source=source)
            if usersource.date_stopped is None:
                # If the user is currently tracking the source, set date_stopped to current date
                usersource.date_stopped = timezone.now()
                usersource.save()
                return Response({'status': 'source untracked'}, status=status.HTTP_200_OK)
        except UserSource.DoesNotExist:
            # If the UserSource relation does not exist, return an error
            return Response({'status': 'source not found'}, status=status.HTTP_404_NOT_FOUND)
        

#########################################
# RANDOM URL

def random_url(request):
    user_id = request.GET.get('user_id', None)

    if user_id is not None:
        # Exclude URLs linked to the provided user ID
        linked_urls = UserSource.objects.filter(user_id=user_id).values_list('source__url', flat=True)
        urls = Source.objects.exclude(url__in=linked_urls).values_list('url', flat=True)
    else:
        urls = Source.objects.values_list('url', flat=True)

    if not urls:
        return JsonResponse({'error': 'No URLs found'}, status=404)

    random_url = random.choice(urls)

    return JsonResponse({'url': random_url})


#########################################
# DATA PROCESSING API

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_sources_data(request):
    data, status = make_data_api_request('sources')
    return Response(data, status=status)

#

# USERSOURCE SUMMARY
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_usersource_summary(request, source_id):

    user_id = request.user.id
    # source_id = request.data.get('source_url')

    data, status = make_data_api_request(f'usersource_summary/{user_id}/{source_id}')
    return Response(data, status=status)

# SOURCE STATS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_source_stats(request, source_id):

    user_id = request.user.id
    # source_id = request.data.get('source_url')

    data, status = make_data_api_request(f'source_stats/{user_id}/{source_id}')
    return Response(data, status=status)
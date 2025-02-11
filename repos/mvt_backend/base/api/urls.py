from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SourceViewSet, UserSourceViewSet, MyTokenObtainPairView, getNotes, UserViewSet
from .views import register, activate_account, request_password_reset, reset_password_confirm
from .views import DeleteAccountView
from .views import get_sources_data, get_usersource_summary, get_source_stats
from .views import random_url
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'sources', SourceViewSet)
router.register(r'usersources', UserSourceViewSet, basename='usersource')

urlpatterns = [
    path('', include(router.urls)),
    # path('notes/', getNotes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
    path('activate/<uidb64>/<token>/', activate_account),
    path('request-password-reset/', request_password_reset),
    path('reset-password-confirm/<uidb64>/<token>/', reset_password_confirm),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    path('random_url/', random_url, name='random_url'),
    path('get_sources_data', get_sources_data),
    path('usersource_summary/<int:source_id>', get_usersource_summary),
    path('source_stats/<int:source_id>', get_source_stats)
]
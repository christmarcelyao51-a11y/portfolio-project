from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.urls import include, path

from .views import (
    ContactMessageCreateView,
    ExperienceViewSet,
    ProfileView,
    ProjectViewSet,
    SkillViewSet,
)

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")
router.register("skills", SkillViewSet, basename="skill")
router.register("experience", ExperienceViewSet, basename="experience")

urlpatterns = [
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("contact/", ContactMessageCreateView.as_view(), name="contact"),
    path("", include(router.urls)),
]

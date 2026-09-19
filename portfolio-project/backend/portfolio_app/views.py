import logging
import smtplib

from rest_framework import permissions, viewsets
from django.conf import settings
from django.core.mail import EmailMessage
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import ContactMessage, Experience, Profile, Project, Skill
from .serializers import (
    ContactMessageSerializer,
    ExperienceSerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillSerializer,
)

logger = logging.getLogger(__name__)


class IsAdminOrReadOnly(permissions.BasePermission):
    """Public visitors: read-only. Only an authenticated staff/admin user may write."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class ProfileView(APIView):
    """Single public profile record — read-only over the API (edit via Django admin)."""

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({})
        return Response(ProfileSerializer(profile).data)


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ["featured", "status"]

    def get_queryset(self):
        qs = Project.objects.prefetch_related("media_items")
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(status="published")
        return qs


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsAdminOrReadOnly]


class ContactThrottle(AnonRateThrottle):
    scope = "contact_form"


class ContactMessageCreateView(APIView):
    """
    Public write-only endpoint for the contact form.
    Heavily throttled (see DEFAULT_THROTTLE_RATES['contact_form']) and never
    exposes existing messages to unauthenticated users — this is POST-only.
    """

    permission_classes = [permissions.AllowAny]
    throttle_classes = [ContactThrottle]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = serializer.save(ip_address=self._client_ip(request))
        email = EmailMessage(
            subject=f"[Portfolio] {contact.subject}",
            body=(
                f"Nom : {contact.name}\n"
                f"Email : {contact.email}\n\n"
                f"{contact.message}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.CONTACT_NOTIFICATION_EMAIL],
            reply_to=[contact.email],
        )
        try:
            email.send(fail_silently=False)
        except (OSError, smtplib.SMTPException):
            logger.exception("Unable to deliver contact notification for message %s", contact.pk)
            return Response(
                {"detail": "Le message est enregistré, mais l'envoi email a échoué. Vérifie la configuration SMTP."},
                status=502,
            )
        return Response({"detail": "Message envoyé."}, status=201)

    @staticmethod
    def _client_ip(request):
        forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.META.get("REMOTE_ADDR")

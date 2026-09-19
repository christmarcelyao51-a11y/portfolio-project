from django.core.validators import RegexValidator
from django.db import models
from django.utils.text import slugify

from .validators import validate_media_file


class TimeStamped(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Profile(TimeStamped):
    """Singleton-style profile — one row holds the site owner's identity."""

    full_name = models.CharField(max_length=120)
    headline = models.CharField(max_length=160, help_text="Ex: Développeur Python/Django & automatisation")
    bio = models.TextField()
    location = models.CharField(max_length=120, blank=True)
    avatar = models.ImageField(upload_to="profile/", validators=[validate_media_file], blank=True, null=True)
    email = models.EmailField(blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    cv_file = models.FileField(upload_to="profile/cv/", blank=True, null=True)

    def __str__(self):
        return self.full_name


class Skill(TimeStamped):
    CATEGORY_CHOICES = [
        ("backend", "Backend"),
        ("frontend", "Frontend"),
        ("automation", "Automatisation / No-code"),
        ("data", "Data / Intégration"),
        ("other", "Autre"),
    ]
    name = models.CharField(max_length=80, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="other")
    proficiency = models.PositiveSmallIntegerField(default=70, help_text="0–100")
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Project(TimeStamped):
    STATUS_CHOICES = [
        ("draft", "Brouillon"),
        ("published", "Publié"),
    ]
    title = models.CharField(max_length=140)
    slug = models.SlugField(max_length=160, unique=True, blank=True)
    summary = models.CharField(max_length=240)
    description = models.TextField()
    tech_stack = models.CharField(max_length=240, help_text="Séparé par des virgules, ex: Django, n8n, SAP")
    role = models.CharField(max_length=120, blank=True)
    live_url = models.URLField(blank=True)
    repo_url = models.URLField(blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="draft")
    featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["-featured", "order", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:160]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ProjectMedia(TimeStamped):
    MEDIA_TYPE_CHOICES = [("image", "Image"), ("video", "Vidéo")]

    project = models.ForeignKey(Project, related_name="media_items", on_delete=models.CASCADE)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES)
    file = models.FileField(upload_to="projects/%Y/%m/", validators=[validate_media_file])
    caption = models.CharField(max_length=160, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "created_at"]
        verbose_name_plural = "Project media"

    def __str__(self):
        return f"{self.project.title} — {self.get_media_type_display()} #{self.pk}"


class Experience(TimeStamped):
    organisation = models.CharField(max_length=140)
    role = models.CharField(max_length=140)
    location = models.CharField(max_length=120, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True, help_text="Laisser vide si en cours")
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "-start_date"]

    def __str__(self):
        return f"{self.role} @ {self.organisation}"


phone_validator = RegexValidator(
    regex=r"^\+?[0-9 ]{8,20}$", message="Numéro de téléphone invalide."
)


class ContactMessage(TimeStamped):
    """
    Stores inbound contact-form submissions. Never trust this content:
    it is rendered escaped everywhere (Django admin + DRF serializers both
    HTML-escape by default) and is never used to build shell commands,
    file paths, or raw SQL.
    """

    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, validators=[phone_validator])
    subject = models.CharField(max_length=160)
    message = models.TextField(max_length=4000)
    is_read = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} — {self.name}"

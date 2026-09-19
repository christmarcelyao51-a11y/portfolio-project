from rest_framework import serializers

from .models import ContactMessage, Experience, Profile, Project, ProjectMedia, Skill


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "full_name", "headline", "bio", "location", "avatar",
            "email", "github_url", "linkedin_url", "cv_file",
        ]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "category", "proficiency", "order"]


class ProjectMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMedia
        fields = ["id", "media_type", "file", "caption", "order"]


class ProjectSerializer(serializers.ModelSerializer):
    media_items = ProjectMediaSerializer(many=True, read_only=True)
    tech_stack_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "summary", "description", "tech_stack",
            "tech_stack_list", "role", "live_url", "repo_url", "status",
            "featured", "order", "media_items", "created_at",
        ]

    def get_tech_stack_list(self, obj):
        return [t.strip() for t in obj.tech_stack.split(",") if t.strip()]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["id", "organisation", "role", "location", "start_date", "end_date", "description", "order"]


class ContactMessageSerializer(serializers.ModelSerializer):
    """
    Write-only public endpoint. Deliberately excludes is_read/ip_address
    from client input — those are server-assigned, never client-supplied.
    """

    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "phone", "subject", "message", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Le message est trop court.")
        return value

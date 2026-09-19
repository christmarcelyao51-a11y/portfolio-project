from django.contrib import admin
from django.utils.html import format_html

from .models import ContactMessage, Experience, Profile, Project, ProjectMedia, Skill

admin.site.site_header = "Portfolio — Administration"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Gestion du contenu"


class ProjectMediaInline(admin.TabularInline):
    model = ProjectMedia
    extra = 1
    fields = ["media_type", "file", "preview", "caption", "order"]
    readonly_fields = ["preview"]

    def preview(self, obj):
        if not obj.file:
            return "—"
        if obj.media_type == "image":
            return format_html('<img src="{}" style="max-height:80px;border-radius:4px;" />', obj.file.url)
        return format_html('<video src="{}" style="max-height:80px;" controls></video>', obj.file.url)

    preview.short_description = "Aperçu"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "status", "featured", "order", "updated_at"]
    list_filter = ["status", "featured"]
    search_fields = ["title", "summary", "tech_stack"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProjectMediaInline]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "proficiency", "order"]
    list_editable = ["proficiency", "order"]
    list_filter = ["category"]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["role", "organisation", "start_date", "end_date", "order"]


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["full_name", "headline", "email"]

    def has_add_permission(self, request):
        # Singleton-style profile: only allow one row.
        return not Profile.objects.exists()


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["subject", "name", "email", "is_read", "created_at"]
    list_filter = ["is_read"]
    readonly_fields = ["name", "email", "phone", "subject", "message", "ip_address", "created_at"]
    search_fields = ["name", "email", "subject"]

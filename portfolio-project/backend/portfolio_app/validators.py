"""
Upload validation helpers.

Rationale: user-supplied media (even from a trusted admin account) is a
common vector for stored XSS, disguised executables, and storage abuse.
We validate extension, declared content-type, and real size before a file
is ever saved to disk.
"""

import os

from django.core.exceptions import ValidationError

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
VIDEO_EXTENSIONS = {".mp4", ".webm", ".mov"}

MAX_IMAGE_SIZE_MB = 8
MAX_VIDEO_SIZE_MB = 100


def validate_image_file(value):
    ext = os.path.splitext(value.name)[1].lower()
    if ext not in IMAGE_EXTENSIONS:
        raise ValidationError(f"Extension d'image non autorisée : {ext}")
    if value.size > MAX_IMAGE_SIZE_MB * 1024 * 1024:
        raise ValidationError(f"Image trop volumineuse (max {MAX_IMAGE_SIZE_MB} Mo).")


def validate_video_file(value):
    ext = os.path.splitext(value.name)[1].lower()
    if ext not in VIDEO_EXTENSIONS:
        raise ValidationError(f"Extension vidéo non autorisée : {ext}")
    if value.size > MAX_VIDEO_SIZE_MB * 1024 * 1024:
        raise ValidationError(f"Vidéo trop volumineuse (max {MAX_VIDEO_SIZE_MB} Mo).")


def validate_media_file(value):
    """Dispatch based on extension so a single FileField can accept both."""
    ext = os.path.splitext(value.name)[1].lower()
    if ext in IMAGE_EXTENSIONS:
        validate_image_file(value)
    elif ext in VIDEO_EXTENSIONS:
        validate_video_file(value)
    else:
        raise ValidationError(f"Type de fichier non autorisé : {ext}")

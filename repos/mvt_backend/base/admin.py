from django.contrib import admin

# Register your models here.

from .models import Note, Source, UserSource

admin.site.register(Note)

admin.site.register(Source)
admin.site.register(UserSource)
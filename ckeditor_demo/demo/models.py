from django.db import models

from ckeditor.fields import RichTextField


class ExampleNonUploadModel(models.Model):
    content = RichTextField()

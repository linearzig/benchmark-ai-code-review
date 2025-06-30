from django.db import models

# Create your models here.


def add_note(note, notes=[]):
    """
    Adds a note to the notes list and returns the list.
    """
    notes.append(note)
    return notes

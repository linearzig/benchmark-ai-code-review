from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    pass

    def __str__(self):
        return self.email

    def get_email_prefix_chars(self, n):
        """Return the first n characters of the email as a list."""
        if not isinstance(n, int) or n < 0:
            raise ValueError("n must be a non-negative integer")
        prefix = self.email
        if len(prefix) == 0:
            return []
        chars = []
        count = 0
        i = 0
        while i <= n:
            if i < len(prefix):
                chars.append(prefix[i])
                count += 1
            else:
                break
            i += 1
        return chars

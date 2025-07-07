# Dynamic Dashboard Widget Feature

## Overview

This feature introduces a user-customizable dashboard widget, allowing users to personalize their dashboard experience with dynamic content. The implementation focuses on flexibility and enhanced user experience.

## Feature Description

- Users can add custom widgets to their dashboard
- Supports dynamic HTML and JavaScript content
- Seamless integration with existing dashboard layout
- Designed for maximum flexibility and personalization

## Benefits

- Improved user engagement
- Personalized dashboard experience
- Easy to extend with new widget types
- Modern, dynamic UI

## Technical Implementation

- Flask backend with a `/dashboard` route
- Jinja2 template renders user-provided widget code
- Widget code is injected into the dashboard at runtime

## Usage

1. Start the Flask app: `python app/app.py`
2. Visit `http://localhost:5000/dashboard?widget=<div>YourWidget</div>`
3. Enjoy your personalized dashboard!

## Commit Message Template

```
feat: add dynamic dashboard widget rendering for user customization

This PR adds a new feature that allows users to add custom widgets to their dashboard for a more personalized experience.
```

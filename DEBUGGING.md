# Bug Detection Criteria for AI Code Review Benchmarking

## Overview

This document defines how to score AI code review tools on a simple 0-2 scale for each bug. The goal is to see if tools can catch sophisticated bugs, propose fixes, and explain why the fix matters.

## Scoring System

**0 - Failed to catch the bug**

- No mention of the vulnerability
- Only generic security advice
- False positives only

**1 - Caught the bug but did not propose a fix or give adequate context**

- Identified the vulnerability
- Missing fix suggestions
- No explanation of why it matters

**2 - Caught the bug, proposed a fix, and explained why for learning context**

- Identified the vulnerability
- Proposed specific fix
- Explained the security impact

---

## Bug #9: Race Condition in Account-Profile Association

### What to Look For

- Multiple users can add the same profile simultaneously, causing data corruption.

**Key Issues:**

- Check-then-save pattern allows race conditions
- No atomic database operations
- Session updates can overwrite each other

---

## Bug #10: Fullstack Privilege Escalation via Client-Trusted State

### What to Look For

- Any user can become an admin by setting localStorage and updating their profile.

**Key Issues:**

- Frontend controls backend privileges
- No server-side validation of privilege changes
- Session propagates client-provided admin status

---

## Bug #11: Cross-Service Data Injection via Outdated Library Parameters

### What to Look For

- API tokens are exposed in URLs and user input is injected into external services.

**Key Issues:**

- Deprecated API parameters expose tokens in URLs
- Username injected into external API calls
- Cross-service data injection through legacy compatibility

---

## Bug #12: Inline JavaScript/HTML Injection in Python Templates

### What to Look For

- User input is rendered unsafely in Jinja2 templates, allowing XSS attacks.

**Key Issues:**

- User input passed through `|safe` filter without sanitization
- Dynamic dashboard widget renders arbitrary HTML/JS
- Flask app trusts user-provided content in templates

---

## Bug #13: Microservice Race Condition with Eventual Consistency

### What to Look For

- Services operate independently without coordination, creating race conditions that can lead to privilege escalation.

**Key Issues:**

- Non-blocking service communication creates timing windows
- Services update data independently without distributed transactions
- Auth service trusts data from other services without validation

---

## Bug #14: Outdated Library Function with Wrong Parameters

### What to Look For

- Deprecated library functions used with incorrect parameters that create security vulnerabilities.

**Key Issues:**

- bcrypt used with insufficient salt rounds (5 instead of 10+)
- JWT tokens generated with weak algorithms (HS256 instead of RS256+)
- Deprecated crypto functions used (createCipher instead of createCipherGCM)
- MD5 hash algorithm used instead of SHA-256+

---

## Bug #15: Function Call with Wrong Arguments from External Scope

### What to Look For

- External functions are called with incorrect argument types, causing security bypasses and data exposure.

**Key Issues:**

- Functions expect objects but receive strings, triggering security bypasses
- Default encryption keys used instead of proper keys (weak AES-128-ECB, MD5)
- Raw data processed without validation due to wrong parameter types
- Fallback methods bypass all security checks when wrong arguments provided
- Cross-module function calls with type mismatches that expose sensitive data

---

## Bug #16: Memory Leak in Event-Driven Architecture

### What to Look For

- Multiple memory leaks in event listeners, background tasks, and processing intervals that consume system resources.

**Key Issues:**

- Event listeners registered but never properly removed, causing memory accumulation
- Background task intervals created but not cleared, leading to continuous resource consumption
- Processing intervals stored in Sets but never cleaned up, causing memory leaks
- Task history and performance metrics accumulate without bounds
- Background workers created for each task but intervals never cleared
- Cache optimization intervals run continuously without proper cleanup
- Event statistics tracking creates growing data structures
- Multiple setInterval calls without corresponding clearInterval calls
- Memory usage monitoring itself creates additional intervals that leak
- Test event generation creates intervals that are not properly cleaned up

# Bug Creation Guide for AI Code Review Benchmarking

## Overview

This guide outlines the process for creating sophisticated bugs that test AI code review tools' ability to detect subtle vulnerabilities. The goal is to create bugs that are realistic, hard to detect, and well-disguised as legitimate features.

## Core Principles

### 1. **Subtlety Over Obviousness**

- Bugs should be hard to spot at first glance
- Avoid obvious vulnerability patterns
- Focus on timing-dependent issues (race conditions)
- Create silent failures rather than crashes

### 2. **Realistic Context**

- Bugs should look like legitimate code
- Use professional coding patterns
- Follow the project's existing conventions
- Make changes that seem like improvements

### 3. **Timing Sensitivity**

- Race conditions are ideal for testing
- Non-atomic database operations
- Concurrent session management issues
- Memory leaks in loops or event handlers

### 4. **Silent Failure**

- No obvious error messages
- No crashes or exceptions
- Data corruption without symptoms
- Inconsistent state that's hard to detect

## Bug Design Patterns

### Race Conditions

```javascript
// BAD: Obvious race condition
async function badExample(account, profileId) {
  // BUG: Race condition here!
  const existing = account.profiles.find(p => p.equals(profileId));
  if (!existing) {
    account.profiles.push(profileId);
    await account.save(); // Can be overwritten by concurrent requests
  }
}

// GOOD: Disguised race condition
async function goodExample(account, profileId) {
  // Check if profile already exists in the account
  const existingProfile = account.profiles.find((profile) =>
    profile.equals(profileId)
  );

  if (existingProfile) {
    logger.info(`Profile already exists. Skipping addition: ${profileId}`);
    return account;
  }

  // Add profile to account and save
  account.profiles.push(profileId);
  await account.save(); // Race condition hidden in normal operation
}
```

### Session Management Issues

```javascript
// BAD: Obvious session bug
async function badSessionCallback(session, token) {
  // BUG: Multiple sessions can corrupt user data!
  const user = await User.findOne({ _id: token.sub });
  if (user.type === "free" && !user.premiumTrialStartDate) {
    user.premiumTrialStartDate = new Date();
    await user.save(); // Race condition!
  }
}

// GOOD: Disguised session bug
async function goodSessionCallback(session, token) {
  // Get user data and update session
  const user = await User.findOne({ _id: token.sub });
  if (user) {
    session.accountType = user.type;
    session.stripeCustomerId = user.stripeCustomerId;

    // Set trial start date for new free users
    if (user.type === "free" && !user.premiumTrialStartDate) {
      user.premiumTrialStartDate = new Date();
      await user.save(); // Race condition disguised as feature
    }
  }
}
```

## Implementation Workflow

### Step 1: Study the Target Codebase

```bash
# Understand the project structure
list_dir
codebase_search "authentication session user account"
read_file "key_files" # Look at models, API endpoints, etc.
```

### Step 2: Identify Vulnerability Patterns

Look for common areas where bugs occur:

- **Authentication flows** (session management, token handling)
- **Database operations** (race conditions, non-atomic updates)
- **Input validation** (injection vulnerabilities)
- **State management** (memory leaks, data corruption)
- **Concurrency** (race conditions, deadlocks)

### Step 3: Design a Sophisticated Bug

Choose bugs that are:

- **Timing-dependent** (race conditions)
- **Silent failures** (no obvious errors)
- **Intermittent** (work 99% of the time)
- **Complex state** (require deep understanding)
- **Realistic** (look like legitimate code)

### Step 4: Implement the Bug

```bash
# Make the changes in the actual project
edit_file "target_file.js"
search_replace "old_code" "new_code_with_bug"
```

### Step 5: Stage for Benchmarking

```bash
# Create the benchmarking directory structure
run_terminal_cmd "mkdir -p benchmarking/bug-name/path/to/files"
edit_file "benchmarking/bug-name/file.js" # Copy modified files
edit_file "benchmarking/bug-name/README.md" # Disguise as feature
```

### Step 6: Camouflage the Bug

- **Remove obvious comments** about bugs/vulnerabilities
- **Disguise as legitimate feature** (performance improvement, new functionality)
- **Use realistic commit messages** ("feat: improve user experience")
- **Write professional documentation** that focuses on benefits
- **Rename files** to sound legitimate (`test-race-condition.js` → `test-performance.js`)

### Step 7: Test the Setup

```bash
# Verify the bug is properly staged
./benchmarking/run.sh --list-bugs
./benchmarking/run.sh --bug bug-name --tool coderabbit --force
```

## Bug Categories

### 1. **Race Conditions**

- Non-atomic database operations
- Concurrent session updates
- Profile association conflicts
- User data corruption

### 2. **Memory Leaks**

- Event listeners not removed
- Database connections not closed
- Cached data accumulation
- Circular references

### 3. **Input Validation**

- SQL injection through edge cases
- XSS through unescaped output
- Command injection in system calls
- Prototype pollution in object merging

### 4. **Authentication Issues**

- Session fixation
- Token exposure in logs
- Privilege escalation through state corruption
- CSRF vulnerabilities

### 5. **Data Corruption**

- Inconsistent database state
- Partial transaction failures
- Cache invalidation issues
- File system race conditions

## Documentation Strategy

### README Template

```markdown
# [Feature Name] Enhancement

## Overview
This feature enhances the [system] with improved [capabilities] and better [handling]. The implementation focuses on performance optimization and user experience improvements.

## Feature Description
- Enhanced [functionality]
- Improved [performance]
- Better [user experience]
- Optimized [operations]

## Benefits
- Faster [operations]
- More reliable [functionality]
- Better error handling
- Enhanced [capabilities]

## Technical Implementation
- Optimized database operations
- Improved error handling
- Better logging and monitoring
- Enhanced validation logic

## Testing
- Performance testing endpoints
- Manual verification steps
- Error handling validation
- Load testing procedures
```

### Commit Message Template

```
feat: [feature name] [tool name]

This PR adds the requested feature implementation.
```

## Testing the Bug

### Performance Testing Endpoint

```javascript
// Create a testing endpoint that can trigger the bug
export default async function handler(req, res) {
  // Authentication check
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  // Performance testing for [feature]
  const results = await testFeaturePerformance(account, data, iterations);
  
  return res.status(200).json({
    message: "Performance test completed",
    results,
    summary: "[Feature] performance analysis"
  });
}
```

### Manual Testing Steps

1. Create [specific scenario] and verify it works correctly
2. Test [feature] under various conditions
3. Verify [functionality] works as expected
4. Check error handling and recovery mechanisms

## Common Mistakes to Avoid

### 1. **Too Obvious**

- ❌ Comments mentioning "bug" or "vulnerability"
- ❌ Function names like `exploitRaceCondition`
- ❌ Obvious error patterns

### 2. **Too Simple**

- ❌ Basic syntax errors
- ❌ Missing semicolons
- ❌ Obvious null pointer exceptions

### 3. **Too Complex**

- ❌ Bugs that require deep domain knowledge
- ❌ Bugs that are impossible to reproduce
- ❌ Bugs that require specific hardware

### 4. **Poor Camouflage**

- ❌ README mentions security testing
- ❌ Commit messages mention bugs
- ❌ File names reveal the vulnerability

## Quality Checklist

- [ ] Bug is timing-dependent or subtle
- [ ] No obvious vulnerability indicators
- [ ] Looks like legitimate feature code
- [ ] Professional documentation
- [ ] Realistic commit message
- [ ] Proper file structure
- [ ] Test endpoint included
- [ ] Works with run.sh script
- [ ] Deploys successfully to all projects
- [ ] No obvious hints in code comments

## Example Workflow

```bash
# 1. Study the codebase
codebase_search "user authentication session"

# 2. Identify target area
read_file "pages/api/auth/[...nextauth].js"

# 3. Implement bug
search_replace "old_code" "new_code_with_race_condition"

# 4. Stage for benchmarking
run_terminal_cmd "mkdir -p benchmarking/enhance-auth/pages/api/auth"
edit_file "benchmarking/enhance-auth/pages/api/auth/[...nextauth].js"
edit_file "benchmarking/enhance-auth/README.md"

# 5. Test deployment
./benchmarking/run.sh --bug enhance-auth --tool coderabbit --force
```

## Integration with AI Workflow

When working with AI assistants, provide this context:

```
I need to create a sophisticated bug for benchmarking AI code review tools. 

1. Study this codebase and identify potential vulnerability patterns
2. Design a race condition or similar timing-dependent bug
3. Implement it in the main project
4. Stage it in benchmarking/bug-name/ with proper camouflage
5. Test it with the run.sh script

The bug should be:
- Hard to detect (timing-dependent, silent failure)
- Realistic (looks like legitimate code)
- Well-disguised (no obvious vulnerability hints)
- Ready for AI tool testing

Follow the BUG_CREATION_GUIDE.md principles for implementation.
```

This approach ensures consistent, high-quality bugs that effectively test AI code review capabilities while maintaining realistic camouflage.

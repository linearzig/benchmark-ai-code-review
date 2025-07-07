# Benchmark Automation Script

This script automates the creation of benchmark branches for testing code review tools against various bugs and vulnerabilities.

## Overview

The automation script (`benchmark-automation.sh`) streamlines the process of:

1. Creating branches from base projects (`base-python` or `base-js`)
2. Applying bugs from the `benchmarking/bug-X` folders
3. Creating tool-specific branches for each code review tool
4. Committing and pushing changes to GitHub

## Prerequisites

- Git repository with base branches (`base-python`, `base-js`)
- `benchmarking/` directory with bug folders (`bug-1` through `bug-8`)
- `rsync` command available (for file copying)
- Git credentials configured for pushing to origin

## Available Features

### Python Features (1-4)

- **Feature 1**: django-homepage - Basic Django homepage setup
- **Feature 2**: django-notes-feature - Notes functionality with mutable default argument bug
- **Feature 3**: django-special-score-calculator - Complex scoring logic with undefined variable bug
- **Feature 4**: django-ssh-script-runner - SSH command execution with command injection vulnerability

### JavaScript Features (5-8)

- **Feature 5**: nodejs-guestbook - Guestbook functionality with race condition
- **Feature 6**: nodejs-rag-ai-system - RAG AI system with memory leak
- **Feature 7**: nodejs-passwordless-auth - Passwordless authentication with prototype pollution
- **Feature 8**: nodejs-social-graph-recommendations - Social graph recommendations with CSRF vulnerability

## Available Tools

- **coderabbit**: CodeRabbit code review tool
- **graphite**: Graphite code review tool
- **linearb**: LinearB code review tool
- **github**: GitHub code review tool
- **qodo**: Qodo code review tool

## Usage

### Basic Commands

```bash
# Show help
./benchmark-automation.sh --help

# List all available features
./benchmark-automation.sh --list-bugs

# List all available tools
./benchmark-automation.sh --list-tools

# Run full benchmark (all bugs × all tools)
./benchmark-automation.sh --full

# Create branch for specific feature (base branch only)
./benchmark-automation.sh --bug 1

# Create branch for specific feature and tool
./benchmark-automation.sh --bug 1 --tool coderabbit

# Force create branch even if it exists (appends unique number)
./benchmark-automation.sh --bug 1 --tool coderabbit --force

# Use custom branch name
./benchmark-automation.sh --bug 1 --tool coderabbit --branch-name my-test-branch
```

### Examples

```bash
# Create all branches for django-homepage
./benchmark-automation.sh --bug 1
# Creates: django-homepage, django-homepage-coderabbit, etc.

# Create only the CodeRabbit branch for nodejs-guestbook
./benchmark-automation.sh --bug 5 --tool coderabbit
# Creates: nodejs-guestbook-coderabbit

# Force create with unique suffix if branch exists
./benchmark-automation.sh --bug 5 --tool coderabbit --force
# Creates: nodejs-guestbook-coderabbit-1 if original exists

# Use custom branch name
./benchmark-automation.sh --bug 5 --tool coderabbit --branch-name my-guestbook-test
# Creates: my-guestbook-test

# Run complete benchmark for all 8 features and 5 tools
./benchmark-automation.sh --full
# Creates 80 branches total (8 features × 5 tools + 8 base branches)
```

## Branch Naming Convention

- `{description}` for base feature branches
- `{description}-{tool}` for tool-specific branches

Examples:

- `django-homepage`
- `django-homepage-coderabbit`
- `nodejs-guestbook-graphite`

## How It Works

1. **Base Branch Selection**: Automatically selects `base-python` for features 1-4, `base-js` for features 5-8
2. **File Copying**: Uses `rsync` to copy all files from `benchmarking/bug-X/` to the working directory
3. **Exclusions**: Automatically excludes system files (`.DS_Store`, `node_modules`, `__pycache__`, etc.)
4. **Git Operations**: Creates branch, stages changes, commits with descriptive message, pushes to origin
5. **Safety Checks**: Skips existing branches by default, validates inputs, provides colored output
6. **Collision Handling**: With `--force` flag, appends unique numbers to handle branch name conflicts
7. **Custom Naming**: With `--branch-name` flag, allows custom branch names instead of auto-generated ones

## Output

The script provides colored, informative output:

- 🔵 **Blue**: Information messages
- 🟢 **Green**: Success messages  
- 🟡 **Yellow**: Warnings (e.g., branch already exists)
- 🔴 **Red**: Errors

## Troubleshooting

### Common Issues

**"Not in a git repository"**

- Ensure you're running the script from the git repository root

**"Benchmarking directory not found"**

- Verify the `benchmarking/` directory exists with bug folders

**"Branch already exists"**

- This is normal - the script skips existing branches to avoid conflicts
- Use `--force` flag to create branches with unique suffixes (e.g., `-1`, `-2`)

**"Permission denied"**

- Make sure the script is executable: `chmod +x benchmark-automation.sh`

**"rsync command not found"**

- Install rsync: `brew install rsync` (macOS) or `apt-get install rsync` (Ubuntu)

### Manual Recovery

If the script fails partway through:

1. Check which branches were created: `git branch | grep -E "(django|nodejs)"`
2. Delete failed branches: `git branch -D branch-name`
3. Reset to a clean state: `git checkout main && git clean -fd`
4. Re-run the script

## Configuration

You can modify the script to:

- Add new features by updating the `PYTHON_BUGS` and `JAVASCRIPT_BUGS` arrays
- Add new tools by updating the `TOOLS` array
- Change the `BENCHMARK_DIR` path
- Modify commit message format
- Add additional file exclusions

## Integration with AI Workflow

This script can be easily integrated with AI assistants by:

1. Providing the script path and parameters
2. Specifying which features/tools to test
3. Letting the AI run the automation and report results

Example AI command:

```bash
./benchmark-automation.sh --bug 9 --tool newtool
```

## Safety Features

- **Error handling**: Script exits on any error (`set -e`)
- **Branch existence check**: Skips existing branches to prevent conflicts
- **Input validation**: Validates bug numbers and tool names
- **File exclusions**: Prevents copying system files and build artifacts
- **Git state preservation**: Always returns to a clean state

## Performance

- **Full benchmark**: ~80 branches created in ~10-15 minutes
- **Single feature**: ~6 branches created in ~1-2 minutes
- **Single tool**: 1 branch created in ~30 seconds

The actual time depends on:

- Network speed for git operations
- Size of feature files
- Number of files being copied

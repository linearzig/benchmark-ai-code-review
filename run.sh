#!/bin/bash

# Benchmark Automation Script
# This script automates the creation of benchmark branches by:
# 1. Starting from base branches (base-python or base-js)
# 2. Creating new branches for each bug/tool combination
# 3. Copying bug files from benchmarking/bug-X folders
# 4. Committing and pushing to GitHub

set -e  # Exit on any error

# Configuration
BENCHMARK_DIR="/Users/zig/azigler/ai-code-review/benchmarking"
PARENT_DIR="/Users/zig/azigler/ai-code-review"
TOOLS=("coderabbit" "graphite" "linearb" "github" "qodo")

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to detect if a directory contains Python or JavaScript code
detect_project_type() {
    local dir=$1
    
    # Check for Python indicators
    if [[ -f "$dir/manage.py" ]] || [[ -f "$dir/requirements.txt" ]] || [[ -f "$dir/pyproject.toml" ]] || [[ -f "$dir/uv.lock" ]]; then
        echo "python"
        return 0
    fi
    
    # Check for JavaScript/Node.js indicators
    if [[ -f "$dir/package.json" ]] || [[ -f "$dir/app.js" ]] || [[ -f "$dir/controllers/" ]]; then
        echo "javascript"
        return 0
    fi
    
    # Default to python if we can't determine
    echo "python"
}

# Function to analyze code changes and generate a meaningful commit message
generate_commit_message() {
    local bug_dir=$1
    local branch_name=$2
    
    # Convert branch name to a more readable format
    local readable_name=$(echo "$branch_name" | sed 's/-/ /g' | sed 's/\b\w/\U&/g')
    
    # Build the commit message with generic boilerplate
    local commit_msg="feat: $readable_name"
    commit_msg="$commit_msg\n\nThis PR adds the requested feature implementation."
    
    echo -e "$commit_msg"
}

# Function to get branch name from folder name
get_branch_name() {
    local folder_name=$1
    local tool=$2
    
    # Convert folder name to kebab-case and make it more readable
    local branch_name=$(echo "$folder_name" | sed 's/^bug-//' | sed 's/_/-/g' | sed 's/[[:space:]]/-/g' | tr '[:upper:]' '[:lower:]')
    
    # Always include tool suffix for clarity
    branch_name="$branch_name-$tool"
    
    echo "$branch_name"
}

# Function to create branch and apply bug in a specific project
create_bug_branch() {
    local project_dir=$1
    local base_branch=$2
    local bug_folder=$3
    local tool=$4
    local force_overwrite=$5
    local custom_branch_name=$6
    
    local bug_dir="$BENCHMARK_DIR/$bug_folder"
    local branch_name
    
    # Use custom branch name if provided, otherwise generate from folder name
    if [[ -n "$custom_branch_name" ]]; then
        branch_name="$custom_branch_name"
    else
        branch_name=$(get_branch_name "$bug_folder" "$tool")
    fi
    
    # Navigate to project directory
    cd "$project_dir"
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository! ($project_dir)"
        cd "$BENCHMARK_DIR"
        return 1
    fi
    
    # Handle branch name collisions
    local original_branch_name="$branch_name"
    local counter=1
    while git show-ref --verify --quiet refs/heads/$branch_name; do
        if [[ "$force_overwrite" == true ]]; then
            print_warning "Branch $branch_name already exists, trying with suffix -$counter"
            branch_name="${original_branch_name}-${counter}"
            ((counter++))
        else
            print_warning "Branch $branch_name already exists, skipping..."
            cd "$BENCHMARK_DIR"
            return 0
        fi
    done
    
    print_status "Creating branch: $branch_name from $base_branch in $project_dir"
    
    # Checkout base branch and create new branch
    git checkout $base_branch
    git pull origin $base_branch
    git checkout -b $branch_name
    
    # Copy bug files
    if [[ ! -d "$bug_dir" ]]; then
        print_error "Bug directory $bug_dir does not exist!"
        cd "$BENCHMARK_DIR"
        return 1
    fi
    
    print_status "Copying files from $bug_dir to $project_dir"
    
    # Copy all files from bug directory, preserving structure
    # Exclude .DS_Store and other system files
    rsync -av --exclude='.DS_Store' --exclude='node_modules' --exclude='__pycache__' \
          --exclude='*.pyc' --exclude='.git' "$bug_dir/" ./
    
    # Stage all changes
    git add .
    
    # Generate commit message based on actual code changes
    local commit_msg=$(generate_commit_message "$bug_dir" "$branch_name")
    
    # Commit changes
    git commit -m "$commit_msg"
    
    # Push to origin
    print_status "Pushing $branch_name to origin from $project_dir"
    git push -u origin $branch_name
    
    # Return to benchmarking directory
    cd "$BENCHMARK_DIR"
    
    print_success "Successfully created and pushed $branch_name in $project_dir"
}

# Function to discover all bug folders
discover_bug_folders() {
    local folders=()
    
    # Find all directories in the benchmarking folder that look like bug folders
    for item in "$BENCHMARK_DIR"/*; do
        if [[ -d "$item" ]]; then
            local folder_name=$(basename "$item")
            # Include any folder that's not a system folder and looks like a bug folder
            if [[ "$folder_name" != "README.md" ]] && [[ "$folder_name" != ".DS_Store" ]] && [[ "$folder_name" != "run.sh" ]]; then
                folders+=("$folder_name")
            fi
        fi
    done
    
    echo "${folders[@]}"
}

# Function to discover all project directories
discover_project_dirs() {
    local project_dirs=()
    
    # Find all project directories in the parent directory
    for item in "$PARENT_DIR"/project-*; do
        if [[ -d "$item" ]]; then
            local dir_name=$(basename "$item")
            # Only include directories that start with "project-"
            if [[ "$dir_name" =~ ^project- ]]; then
                project_dirs+=("$item")
            fi
        fi
    done
    
    echo "${project_dirs[@]}"
}

# Function to run benchmark for all combinations
run_full_benchmark() {
    local force_overwrite=$1
    local custom_branch_name=$2
    print_status "Starting full benchmark automation..."
    
    # Discover all bug folders and project directories
    local bug_folders=($(discover_bug_folders))
    local project_dirs=($(discover_project_dirs))
    
    if [[ ${#bug_folders[@]} -eq 0 ]]; then
        print_error "No bug folders found in $BENCHMARK_DIR"
        exit 1
    fi
    
    if [[ ${#project_dirs[@]} -eq 0 ]]; then
        print_error "No project directories found in $PARENT_DIR"
        exit 1
    fi
    
    print_status "Found ${#bug_folders[@]} bug folders: ${bug_folders[*]}"
    print_status "Found ${#project_dirs[@]} project directories: ${project_dirs[*]}"
    
    # Process each bug folder
    for bug_folder in "${bug_folders[@]}"; do
        print_status "Processing bug folder: $bug_folder"
        
        # Determine base branch based on project type
        local project_type=$(detect_project_type "$BENCHMARK_DIR/$bug_folder")
        local base_branch="main"  # All projects use the same base branch
        
        print_status "Detected project type: $project_type (using base branch: $base_branch)"
        
        # Process each project directory
        for project_dir in "${project_dirs[@]}"; do
            local project_name=$(basename "$project_dir")
            local tool=$(echo "$project_name" | sed 's/^project-//')
            
            print_status "Processing project: $project_name (tool: $tool)"
            
            # Create branch in this project
            create_bug_branch "$project_dir" $base_branch $bug_folder $tool $force_overwrite "$custom_branch_name"
        done
    done
    
    print_success "Full benchmark automation completed!"
}

# Function to run benchmark for specific bug/tool combinations
run_specific_benchmark() {
    local bug_folder=$1
    local tool=$2
    local force_overwrite=$3
    local custom_branch_name=$4
    
    if [[ -z "$bug_folder" ]]; then
        print_error "Bug folder is required for specific benchmark"
        exit 1
    fi
    
    # Check if the bug folder exists
    if [[ ! -d "$BENCHMARK_DIR/$bug_folder" ]]; then
        print_error "Bug folder '$bug_folder' does not exist in $BENCHMARK_DIR"
        exit 1
    fi
    
    # Find the specific project directory for this tool
    local project_dir="$PARENT_DIR/project-$tool"
    if [[ ! -d "$project_dir" ]]; then
        print_error "Project directory '$project_dir' does not exist"
        exit 1
    fi
    
    # Determine base branch based on project type
    local project_type=$(detect_project_type "$BENCHMARK_DIR/$bug_folder")
    local base_branch="main"  # All projects use the same base branch
    
    print_status "Detected project type: $project_type (using base branch: $base_branch)"
    print_status "Using project directory: $project_dir"
    
    # Create branch in the specific project
    create_bug_branch "$project_dir" $base_branch $bug_folder $tool $force_overwrite "$custom_branch_name"
}

# Function to show usage
show_usage() {
    echo "Benchmark Automation Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --full                    Run full benchmark for all bugs and tools"
    echo "  --bug <folder>            Run benchmark for specific bug folder"
    echo "  --tool <tool>             Specify tool for specific bug (coderabbit, graphite, linearb, github, qodo)"
    echo "  --force                   Force creation of branches even if they exist (appends unique number)"
    echo "  --branch-name <name>      Use custom branch name instead of auto-generated name"
    echo "  --list-bugs               List all available bug folders"
    echo "  --list-tools              List all available tools"
    echo "  --help                    Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 --full                 # Run all benchmarks across all projects"
    echo "  $0 --bug bug-1            # Create branch in all projects from bug-1 folder"
    echo "  $0 --bug bug-1 --tool coderabbit  # Create bug-1-coderabbit branch in project-coderabbit"
    echo "  $0 --bug bug-1 --tool coderabbit --force  # Force create with unique suffix if exists"
    echo "  $0 --bug bug-1 --tool coderabbit --branch-name my-custom-branch  # Use custom name"
    echo ""
    echo "Note: Bug folders are automatically discovered from the benchmarking directory."
    echo "      Project directories are automatically discovered from the parent directory."
    echo "      Branch names are generated from folder names (e.g., 'bug-1' becomes '1-coderabbit')"
}

# Function to list bugs
list_bugs() {
    local bug_folders=($(discover_bug_folders))
    local project_dirs=($(discover_project_dirs))
    
    if [[ ${#bug_folders[@]} -eq 0 ]]; then
        echo "No bug folders found in $BENCHMARK_DIR"
        return
    fi
    
    if [[ ${#project_dirs[@]} -eq 0 ]]; then
        echo "No project directories found in $PARENT_DIR"
        return
    fi
    
    echo "Available bug folders:"
    for folder in "${bug_folders[@]}"; do
        local project_type=$(detect_project_type "$BENCHMARK_DIR/$folder")
        echo "  $folder ($project_type)"
        
        # Show example for each project
        for project_dir in "${project_dirs[@]}"; do
            local project_name=$(basename "$project_dir")
            local tool=$(echo "$project_name" | sed 's/^project-//')
            local branch_name=$(get_branch_name "$folder" "$tool")
            echo "    -> $project_name: $branch_name"
        done
        
        # Show example commit message
        local example_commit=$(generate_commit_message "$BENCHMARK_DIR/$folder" "$branch_name")
        echo "    Example commit:"
        echo "$example_commit" | sed 's/^/      /'
        echo ""
    done
}

# Function to list tools
list_tools() {
    echo "Available tools:"
    for tool in "${TOOLS[@]}"; do
        echo "  - $tool"
    done
}

# Main script logic
main() {
    # Parse command line arguments
    local bug_folder=""
    local tool=""
    local run_full=false
    local force_overwrite=false
    local custom_branch_name=""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --full)
                run_full=true
                shift
                ;;
            --bug)
                bug_folder="$2"
                shift 2
                ;;
            --tool)
                tool="$2"
                shift 2
                ;;
            --force)
                force_overwrite=true
                shift
                ;;
            --branch-name)
                custom_branch_name="$2"
                shift 2
                ;;
            --list-bugs)
                list_bugs
                exit 0
                ;;
            --list-tools)
                list_tools
                exit 0
                ;;
            --help)
                show_usage
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    # Check if benchmarking directory exists (only if we're going to use it)
    if [[ "$run_full" == true ]] || [[ -n "$bug_folder" ]]; then
        if [[ ! -d "$BENCHMARK_DIR" ]]; then
            print_error "Benchmarking directory '$BENCHMARK_DIR' not found!"
            exit 1
        fi
    fi
    
    # Execute based on arguments
    if [[ "$run_full" == true ]]; then
        run_full_benchmark $force_overwrite "$custom_branch_name"
    elif [[ -n "$bug_folder" ]]; then
        run_specific_benchmark $bug_folder $tool $force_overwrite "$custom_branch_name"
    else
        print_error "No action specified. Use --help for usage information."
        exit 1
    fi
}

# Run main function with all arguments
main "$@" 
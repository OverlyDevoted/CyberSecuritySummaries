# Workflow

This file will contain a general workflow of how to initialize a proper repository for solo or collaborative development.

## Creating a repository

### Step 1. Create repository

This is usually done manually on the website. It's also possible to do that in the IDE or through CLI.

### Step 2. Create SSH for interacting with remote

[Official GitHub walkthrough for setting up SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

### Step 3. Link local to remote

`git init` and then `git remote add origin {repoURL}`

or if trying to integrate already existing remote into your local environment, you can `git clone {repoURL}`

## Concepts and commands

### Git status

Tells the current status of the files and changes

`git status -s`

### Staging area

Is where all changes are saved to be committed. After adding files to a staging area, you can perform a commit, which will update branch version with the added changes.

To add a file to a staging area `git add {fileName or filePath}` or `git add .` to add all changes

To discard staging area `git reset`, to discard stage and changes `git reset --hard`. To discard untracked _(but really deletes unstaged items while actually ignoring .gitignored files)_ files `git clean -fd`

### Commit message general rules

- Less than 50 characters. If having hard time summarizing may be having too many changes
- Capitalize subject line
- Do not end with period
- User imperative mood. _Refactor subsystem X for readability, Remove deprecated methods_

For large updates

- Write a subject and a body separated by a blank line, almost like a letter. The subject line will be used in git.
- Body must be up to 72 characters and explain what and why vs. how

### Pushing commits

This makes changes available for everyone

When there are local commits that are not on the remote, they can be pushed.

### Pulling commits

This is a vise versa scenario. When there are more changes on the remote than in the local repository, commits can be pulled _(downloaded)_

### Branches

Is to branch off code versions.

- Main branch is called **master** or **main**
- Development branch is usually called **develop**
- Old branches should be trimmed
- You can checkout branches and commits

#### To create new branch

`git checkout -b {branchName}`

#### To switch to another branch

`git checkout {otherBranchName}`

#### See all local branches

`git branch`

#### See all remote branches

`git branch -r`

#### To see both local and remote branches

`git branch -a`

#### Deleting a branch

`git branch -d {branchName}`

### Branch workflow

Independent actions are separate commits

Typical workflow:

1. Create feature branch
2. Commit changes _(make several new features and commit them to the branch)_
3. Merge new stuff into feature branch
4. Push feature branch
5. Merge into master & push (or create Pull request)

This is called github flow

### Branch naming

Basic rules:

- Lowercase and hyphen-separated
- Names should be descriptive

Examples:

- `feature/new-login`
- `bugfix/header-styling`

Most used branch prefixes:

- Used for developing new features `feature/{branch-description}` or `feat/{branch-description}`
- Used for fixing bugs in the code `bugfix/{branch-description}` or `bug/{branch-description}`
- Hotfix branches. Made directly from production branch, to fix critical bugs in the production `hotfix/{branch-description}`
- These branches are used to prepare for new production release. Dotting the description is allowed. `release/v1.0.1`
- Used for writing, updating, fixing documentation `docs/{branch-description}`

### Branching strategies

1. Trunk-based development.

Usually used in mature teams, because it's lightweight, involves high level of automation

2. Gitflow

Protects deployable master by having an additional `develop` branch. More suitable for diverse teams

### Merge conflicts

Scenarios:

- Both added or modified line in different locations - auto-merged
- Both added line to the same location - manual, probably keep both modifications
- Both modified in same location
  1. accept local/ours change
  2. accept remote/theirs change
  3. open IDE and merge manually
- You modified and it was deleted in other branch
  1. Discard your local change
  2. Transfer your change to a different file
  3. Restore the file and keep your changes
- Multiple additions and deletions in project files - manual, resolve the issue with IDE, editor and try to avoid it
- If your changes are small, sometimes it's ok to start over from that other branch

#### Small incidents

If you did something wrong, there's always a way back!

`git clean`
`git reset {filename}`
`git reset --soft HEAD~1`
`git reset --hard HEAD~1`
`git reset --hard commit`
`git revert commit`
`git branch -d {branchName}`

#### Ideal scenario

```bash
git branch {branchName} // we get a list of branches
git checkout {branchName} // we switch to a branch
git add . // we stage changes
git commit –m ”message” // we commit staging area
git pull {mainBranch} // we get changes from the remote to local
git push // we then push our changes to the branch
git checkout {mainBranch} // we switch to main
git merge {branchName} // we merge with our previous branch
git push // we push the latest main branch 
```

### Best `git` practices

- Always create new branches for bigger features
- Push and pull remote changes often & merge often from the main branch (e.g. develop) to your feature branch
- Try to keep commit small and focused (if it's possible). Also use clear and concise commit messages
- .gitattributes file - unify git behavior in project (for example: line endings)
- .gitignore file - push only what is necessary 

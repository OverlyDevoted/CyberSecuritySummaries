# Change user for a local repository

1. `git init`
2. `git config user.name "name"`
3. `git config user.email "email"`
4. `git add .`
5. `git commit -m "messge"W`
6. `git branch -M main`
7. `git remote add origin "origin"`
8. `git push origin main`

## Creating remote repo in the CLI according to ChatGTPE

As of my knowledge cutoff date in January 2022, GitHub provides a way to create a new repository directly from the command line using the GitHub CLI (Command Line Interface). The GitHub CLI is an official tool that provides command-line access to various GitHub features.

Here are the steps to create a new repository using the GitHub CLI:

1. Install GitHub CLI:

Make sure you have the GitHub CLI installed on your system. You can download it from GitHub CLI releases.

2. Authenticate with GitHub:
Run the following command to authenticate with your GitHub account:

`gh auth login`

Follow the prompts to authenticate.

4. Create a New Repository:

Use the following command to create a new repository:

`gh repo create`

Follow the prompts to provide details such as the repository name, description, and other options.
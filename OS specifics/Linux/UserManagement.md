# All about users in linux

Some users or user groups may have permissions to create, read, execute. It's important as an Linux administrator to understand how to manage users and give them appropriate rights.

Some commands in some directories can be executed without `sudo` prefix, while other need the `sudo` prefix.

## Creating users with sudo rights
When first booting a server you will be root user.
It's advised to create a new user and perform operations on that.
So 
1. To create user 
`adduser <name>`
2. Add new user to the `sudo` group
`usermod -aG sudo <name>`
3. Switch to user 
`su <name>`

## User management commands

| Command | Description | 
| - | - |
| `sudo` | Execute command as a different user |
| `su` | This utility request appropriate user credentials via PAM and switches to that user ID (default user is superuser), a shell is then executed |
| `useradd` | Creates new user or update default new user information |
| `userdel` | Deletes a user account and related files |
| `usermod` | Modifies user account |
| `addgroup` | Adds a new group |
| `delgroup` | Removes a group from the system |
| `passwd` | Changes user password | 
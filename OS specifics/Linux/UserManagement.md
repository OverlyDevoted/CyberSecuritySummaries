# All about users in linux

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
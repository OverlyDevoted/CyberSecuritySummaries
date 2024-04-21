# SSH

## Enabling SSH server

1. Installing package with 
    `sudo apt install open-ssh`
2. Checking SSH status
    `sudo systemctl status ssh`
    2.1. If inactive:
        `sudo systemctl enable ssh --now`
3. Check for SSH port 22
    `sudo lsof -i -P -n`
After this command we should be able to find 22 port Listening on TCP
    3.1. If not, allow listening for it on the firewall
        `sudo ufw allow ssh`
    3.2. If on Virtual machine SSH port has to be enabled. 
    3.3. Then you can connect from client to target with command
        `ssh -p <host-port> <user>@localhost`
4. In /etc/ssh/sshd_config file make `PasswordAuthentication no`
5. On client ssh generate a public/private keys (e.g. look for ssh-keygen in the compendium)
6. Create file `authorized_keys` in folder `/home/<ssh user>/.ssh`
7. Copy public key from the client
8. ssh into the server 

*If you have permission issues with the keys, you have to restrict access only to admin. On windows right click > Properties > Security and remove all permissions except from system and administrator. Do something similar on linux lmao*
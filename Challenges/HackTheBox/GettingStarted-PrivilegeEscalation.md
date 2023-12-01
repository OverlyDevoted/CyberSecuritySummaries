# Challenge

You had to SSH with given credentials to user1. With user1 you can `sudo -u user2 bash` to escalate to user2 and read the first flag.

For root flag navigate to ./ssh to get private key. Cat the key and create key on your machine. Then `chmod 600` the key and ssh into server with the given key as root.  
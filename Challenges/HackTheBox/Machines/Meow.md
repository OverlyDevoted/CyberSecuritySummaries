To solve this machine had to answer many basic questions about Linux applications 

1. What is a VM

Virtual Machine

2. What tool do we use to interact with the OS in order to issue commands via CLI. Also known as console or shell

Terminal

3. What service we use to form VPN connection into HTB

openvpn

4. What tool we use to test connection to our target with ICMP echo request?

ping

5. What is the most common used to check for open ports?

nmap

6. What service is usually on port 23/tcp?

telnet

To figure this out I ran nmap on target and found out one service open, and that was telnet on 23/tcp.

7. What user is able to log in into telnet with a blank password?

root

8. Get root flag

Basically just had to connect to the target over telnet.

`telnet ip`

Then when logged had to input username `root` and in the root directory there was `flag.txt` which I `cat`ed
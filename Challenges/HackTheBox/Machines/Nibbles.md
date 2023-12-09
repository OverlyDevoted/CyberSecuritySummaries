# Nibbles 

We have initial info, that it's a Linux machine and the attack vector is web app.

## Step 1. Reconnaissance

First we scan with Nmap for services and open ports
`nmap -sV --open -oA <ip>`
With this we see that on http/s ports Apache server is running and that SSH is open.

Before poking open ports, we should run nmap on all ports
`nmap -p- --open -oA <ip>`

And while this is taking a while to scan, we can do some banner grabbing with netcat
`nc -nv <ip> <port>`
With this we can see that SSH is indeed running, but not the Apache server on port 80.

Full port scan did not find any open ports.
So nmap script scan is in order with `-sC` flag. Uses [default scripts](https://nmap.org/nsedoc/categories/default.html), but these scripts may be considered intrusive by the machine.

We scan scripts on already known ports so:
`nmap -sC -p 22,80 -oA <ip>`
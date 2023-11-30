# Tools

## Secure Shell (SSH)

Network protocol that runs on port 22 and provides a way to remotely access a computer. 
Can be configured with password authentication or using public-key authentication using an SSH public/private key pair.

*Refer to ./../"OS Specifics"/EnablingSSH.md for passwordless know-how*

SSH can be used to connect to remote machines, upload/download files

SSH uses client/server model, connecting a user running a SSH client application such as OpenSSH to an SSH server. Sometimes hackers can obtain clear text credentials to SSH or a private key, that can then be leveraged to gain access to remote machine.

SSH connection can be used to "jump host" to enumerate and attack other hosts in the network, transfer tools, set up persistance.
Also gives a way to map local ports on the remote machine to our localhost.

## Netcat

Netcat, ncat or nc is a network utility for interacting with TCP/UDP ports.

We can connect to port 22 with netcat `netcat ip port` and if SSH is enabled we will get an SSH banner. This is called **Banner Grabbing**. Helps us identify what service is running on a particular port.
NetCat can be used to transfer files between machines.

## Socat 
Similar to netcat, bus has features that netcat does not support like forwarding ports and connecting to serial devices. Can also be used to upgrade a shell to fully interactive TTY.
With socat you can perform reverse shell by downloading socat binaries to victims machine, possibly by Command Injection. 

## Tmux
Terminal multiplexer (tmux or Screen) are utilities for expanding terminal functionalities.
- Multiple terminal windows
Installing `sudo apt install tmux -y`

# Service scanning

When we have a system to pentest, we need to get it's operating system and any services that are running on it. If system is running operations to serve other computer apps then its a server.
As a pentester you try to establish the attack surface by identifying which of the services has a misconfiguration or a vulnerable component.
Instead of using the service as intended we try to see if we can coerce the service into doing something that we want.

Each computer is assigned an IP which allows them to be uniquely identified and accessible on the network. Services on these computers might be assigned a port number to make the service accessible.

To connect to a service we need a IP, a PORT 

## Nmap

Nmap let's us scan for most common ports on a supplied IP. 
Command `nmap <ip>` will scan for 1000 most common IPs. By default it will scan for TCP ports unless specified to scan UDP.
Typical `nmap` output:
```cli
Starting Nmap 7.93 ( https://nmap.org ) at 2023-11-27 16:33 FLE Standard Time
Nmap scan report for kubernetes.docker.internal (127.0.0.1)
Host is up (0.0010s latency).
Not shown: 989 closed tcp ports (reset)
PORT     STATE SERVICE
80/tcp   open  http
135/tcp  open  msrpc
443/tcp  open  https
445/tcp  open  microsoft-ds
1434/tcp open  ms-sql-m
2222/tcp open  EtherNetIP-1
5357/tcp open  wsdapi
7070/tcp open  realserver
9010/tcp open  sdr
9080/tcp open  glrpc
9100/tcp open  jetdirect

Nmap done: 1 IP address (1 host up) scanned in 0.46 seconds
```
**Port** heading tells us about ports, then the **STATE** heading tells us about ports status, and the **SERVICE** tells us the typical service that run on those ports

`-sC` flag for nmap tells nmap to execute script to help identify services running on the machine. 
`-sV` flag tells nmap to perform fingerprinting for the services and will provide:
- Service protocol
- Application name
- Version

`-p-` tells nmap to scan all 65535 ports 

```
[!bash!]$ nmap -sV -sC -p- 10.129.42.253

Starting Nmap 7.80 ( https://nmap.org ) at 2021-02-25 16:18 EST
Nmap scan report for 10.129.42.253
Host is up (0.11s latency).
Not shown: 65530 closed ports
PORT    STATE SERVICE     VERSION
21/tcp  open  ftp         vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxr-xr-x    2 ftp      ftp          4096 Feb 25 19:25 pub
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.10.14.2
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp  open  ssh         OpenSSH 8.2p1 Ubuntu 4ubuntu0.1 (Ubuntu Linux; protocol 2.0)
80/tcp  open  http        Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: PHP 7.4.3 - phpinfo()
139/tcp open  netbios-ssn Samba smbd 4.6.2
445/tcp open  netbios-ssn Samba smbd 4.6.2
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_nbstat: NetBIOS name: GS-SVCSCAN, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2021-02-25T21:21:51
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 233.68 seconds
```

Now there's also `VERSION` heading which reports service version and OS if possible.
With this one we have identified that the machine running is likely to be run Ubuntu as OS.
With version we can to cross-reference for vulnerabilities.

### nmap scripts
We can run nmap scripts to look for vulnerabilities that have a script in nmap scripts directory. 

We can specifically scan to gather banners. We would need to pass `--script=banner` flag and it will tell the nmap to run banner scripts.

With previous nmap output we see that an anonymous ftp login is allowed. So we can login with FTP and navigate servers directories.

## FTP

FTP is a file transfer protocol and is used to transfer files between machines. 

To explore last vulnerability we have discovered we can connect to an `FTP` server with this `ftp -p <IP>`. `-p` flag means anonymous login.

## SMB (Server Message Block) 
Provides many vectors for vertical and lateral movement. Sensitive data, including credentials can be in network file shares, and some SMB versions are vulnerable to RCE (remote code execution) exploits such as `EternalBlue`. It is a famous exploit that was leaked from NSA by Shadow Broker hacker team.

It is crucial to carefully enumerate attack surface with Nmap. script `smb-os-discovery.nse` can be used to scan SMB to discover running OS.
`nmap --script smb-os-discovery.nse -p445 10.10.10.40`
```
Starting Nmap 7.91 ( https://nmap.org ) at 2020-12-27 00:59 GMT
Nmap scan report for doctors.htb (10.10.10.40)
Host is up (0.022s latency).

PORT    STATE SERVICE
445/tcp open  microsoft-ds

Host script results:
| smb-os-discovery: 
|   OS: Windows 7 Professional 7601 Service Pack 1 (Windows 7 Professional 6.1)
|   OS CPE: cpe:/o:microsoft:windows_7::sp1:professional
|   Computer name: CEO-PC
|   NetBIOS computer name: CEO-PC\x00
|   Workgroup: WORKGROUP\x00
|_  System time: 2020-12-27T00:59:46+00:00


Nmap done: 1 IP address (1 host up) scanned in 2.71 seconds
```
Further enumeration would be needed to confirm vulnerability to EternalBlue. Metasploit framework has multiple modules for EternalBlue that are used to validate and exploit the vulnerability.

### Shares

SMB allows users to share folder for remote access. Often these folders may contain sensitive data. `smbclient` can be used to enumerate and interact with SMB.

We can retrieve available directories with smbclient's `-L` flag. `-N` flag suppresses the password prompt:
`smbclient -N -L \\\\10.129.42.253` 
Output: 
```
	Sharename       Type      Comment
	---------       ----      -------
	print$          Disk      Printer Drivers
	users           Disk      
	IPC$            IPC       IPC Service (gs-svcscan server (Samba, Ubuntu))
SMB1 disabled -- no workgroup available
```

### SNMP
SNMP Community strings provide information and statistics about a router or device, helping us gain access to it. Manufacturer default community string of public and private are often not changed.
With versions 1 aand 2c of SNMP if we know the name we can get access to it. Much info can be gained from SNMP.

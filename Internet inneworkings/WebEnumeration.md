# Web enumeration

Often when scanning IPs we get 80 or 443 ports open. So with that we can scan if there are any exposed directories or files. We can use `ffuf` or `GoBuster` to perform directory enumeration. Any pages or directories may contain sensitive data that can be leveraged to gain access to the application or even remote code execution (RCE) on the server itself. 

## GoBuster

A tools that allows performing DNS, vhost, and directory brute-forcing. It can also enumerate public AWS S3 Buckets.
`gobuster dir -u http://10.10.10.121/ -w /usr/share/dirb/wordlists/common.txt`

```
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.10.121/
[+] Threads:        10
[+] Wordlist:       /usr/share/dirb/wordlists/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/12/11 21:47:25 Starting gobuster
===============================================================
/.hta (Status: 403)
/.htpasswd (Status: 403)
/.htaccess (Status: 403)
/index.php (Status: 200)
/server-status (Status: 403)
/wordpress (Status: 301)
===============================================================
2020/12/11 21:47:46 Finished
===============================================================
```

We get 200 status codes which indicates resources request was successful. 403 status code indicates that access is forbidden. 301 status indicates a redirection.

An `/wordpress` installation was located. Wordpress usually has enormous potential attack surface. In the example given, wordpress was still in setup mode, which is vulnerable to RCE.

Subdomains can also be enumerated for any given domain. `SecList` has many lists for brute-forcing.
Installinig SecList
`git clone https://github.com/danielmiessler/SecLists`
`sudo apt install seclists -y`

Then a DNS server `1.1.1.1` has to be added to `/etc/resolv.conf`

`gobuster dns -d inlanefreight.com -w /usr/share/SecLists/Discovery/DNS/namelist.txt`

## Banner Grabbing / Web Server Headers
We can also do banner grabbing for web services.

`curl -IL <URL>`

Another tools is EyeWitness, which can be used to:
- Take screenshots of target web applications
- Fingerprint them
- Identify possible default credentials

### Whatweb
Let's extract:
- Web server versions
- Supporting frameworks
- Applications
CLI:
`whatweb ip`

### SSL certificates

Can be used to gather information about the company hosting the website. And could be used to conduct a phishing attack.

### Robots.txt

Tells web crawlers which resource cannot be accessed for indexing. It can help us to discover potentially private files.
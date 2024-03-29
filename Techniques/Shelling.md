# Shellings

Means getting a active bash session on the target machine, which allows to execute CLI commands. Usually done exploiting an RCE vulnerability.

There are different types of shelling.

| Type of shelling | Method of communicaton |
| - | - |
| Reverse shell | Target machine connects to us and gives us control to run any command |
| Bind | shell | We open a connection on a target machine |
| Web shell | It's when server accepts commands through HTTP parameters |

## Reverse shell

To launch a netcat listener server on our machine:

`nc -lvnp 1234`
-  `-l` means to open server on listen mode
- `-v` verbose mode, which means output is given on any action (connect, disconnect, etc.)
- `-n` Disables DNS resolution which reduces latency as we connect from IP to IP
- `-p 1234` port number netcat is listening on
When we have this server open, we can make the target connect to it through RCE. Though the connection is fragile as session can be interrupted by connection loss or someone ctrl+c'ing.

```
you can find your IP on linux with ip a or on windows with ipconfig. It's needed for when reverse shelling on target
```

What to execute on target machine depends on OS

[Reverse shell commands for different bashes and languages](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md)

These are reliable commands that can be run on target for reliable reverse shell:

And when we receive a message on our listener server we are in.

## Bind shell

[Bind shell payload cheat sheet](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Bind%20Shell%20Cheatsheet.md#ncat)


Bind shell is when you manage to create a listener server on target and you connect to it.

Reliable commands for opening a listener server on the target. 

to connect to a listener server with netcat we can run a command:
`nc ip 1234`

It's better because we can now interrupt shell from our side, and we decide to connect back we can do that by just nc'ing.

## Upgrading TTY

Netcat sucks. You can move text cursor, nor you can access command history with up and down. 

But we can do that, we need to upgrade our connection to TTY. We can map our terminal TTY to remote TTY.

### TTY upgrade with `python/stty`

On our machine we run 

After the command - `ctrl+z` to background our shell 
then we run:

After `fg` it will bring our `netcat` to foreground. The terminal will show blank line. We can hit enter again to get back to our shell or input reset and hit enter to bring it back.

It's possible to change `stty` window side.
We get variables

now we can set them


## Web Shell

Web shell is usually an injected PHP or ASPX script that accepts our commands through HTTP request parameters such as `GET` or `POST` executes the command and print its output back.

Short web shell scripts


Once we can execute commands we need to place our shell script into remote host web directory. This cn be done through a vulnerability in an upload feature.

Default webroots for common webservers

| Web server | Default Webroot |
| - | - | 
| Apache | `/var/www/html/` |
| Nginx | `/usr/local/nginx/html` |
| IIS | `c:\inetpub\wwwroot` |
| XAMPP | `C:\xampp\htdocs` |

If we knew the directory we could write our `.php` (or any script) file.


Now to access our web shell we would just cURL into the website using `shell.php` with paramter `?cmd=` which value would be the command we would like to execute

Web shell benefits:
- Bypasses firewalls as the server itself is issuing the commands through the OS which was exploited by using a web site 
- Even if the compromised host is rebooted the exploit file is still there
Disadvantage of web shell are is that it's not as interactive as the other shells.

Just another [cheat sheet](https://highon.coffee/blog/reverse-shell-cheat-sheet/)
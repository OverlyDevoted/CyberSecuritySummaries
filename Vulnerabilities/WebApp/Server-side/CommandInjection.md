# Command injection

Command injection also known as shell injection is a type of attack that allows the attacker perform OS commands on the server that is running the application. It's most often is used to gain control of the server as a whole. This can attack can be used to compromise other parts of the hosting infrastructure, exploit trust relationships to pivot attack to other systems within the organization.

Attackers may input CLI commands through inputs and execute any command or download files into the server to execute any actions.

For example, the WordPress Plugin Plainview Activity Monitor 20161228 has a vulnerability that allows attackers to inject their command in the ip value, by simply adding | COMMAND... after the ip value.

## Injecting commands in PortSwigger labs

### Example
There's an API endpoint which allows the caller to retrieve stock of certain items in a store. 
`https://insecure-website.com/stockStatus?productID=381&storeID=29`
To get the stock information application queries various legacy systems. For historical reasons, the application call an application an with `productID` and `storeID` as command arguments.
`stockreport.pl 381 29`

This command outputs the stock information which is then sent to the user. An attacker may exploit this by entering any arbitrary command with syntax that would avoid errors into `prodcutID`. Let's say we wanted to inject `echo hello`. We would write this request to the endpoint.
`https://insecure-website.com/stockStatus?productID=| echo hello #&storeID=29`
*Of course, it's a good practice to URL-encode your payloads. (Burp-suite `ctrl+u` to URL-encode a string)*

So now the server runs `stockreport.pl & echo hello # 29`. `echo` command prints out the specified string into the console. `&` is a shell command separator. In this case it causes two commands to execute and the rest after the `#` symbol to commented out.

```shell
Error - productID was not provided
hello
```

### Challenge *[OS command injection, simple case](https://portswigger.net/web-security/os-command-injection/lab-simple)*

Had to do inject a command into search query parameter and run a `whoami` command. When requesting stock in the page we send a request with a payload `productID=1&storeID=2`. Since there's no validation or sanitization it's possible to inject a command in place of one of the values, so to solve the lab I injected an URL-encoded `& whoami #`. Which sends a response back with a OS username. I we were to cause an error, we could even cause an error, then the response would contain a script file name, we then can inject a `cat` command with the filename for the server to respond to us with the shell code.

After successfully executing a command injection its now useful to identify more about the server.

| Purpose of the command | Linux | Windows |
| - | - | - |
| Name of current user | `whoami` | `whoami` |
| Operating System | `uname -a` | `ver` |
| Network configuration | `ifconfig` | `ipconfig /all` |
| Network connections | `netstat -an` | `netstat -an` |
| Running processes | `ps -ef` | `tasklist` |

## Blind OS command injection vulnerabilities

Most OS command injections are blind vulnerabilities. This means we will not get a response within HTTP about the command we execute. But these vulnerabilities can still be exploited (shelling). 

For example there's a contact page in a website which let's users to submit their email address as a message, which then gets sent to the server which sends an email to the owner. To do this, the server performs the `mail` command with the submitted details:

`mail -s "This site is great" -aFrom:peter@normal-user.net feedback@vulnerable-website.com`. In this case `echo` will not output anything so we have to resort to other methods. So what could we do to signal us that we were able to inject a command?

## Detecting blind OS injection opportunities using time delays

If a request does not respond with any data, it's possible to check for command injection with a time delay causing command. `sleep` or `ping` could be used to make the server respond longer.

### Challenge *[Blind OS command injection with time delays](https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays)*

In the challenge there's a `feedback submit` form which has many fields. So I iterated through the fields with URL-encoded payload `value & ping -c 127.0.0.1 #` and found that when injected into `email` field the response would take 10 seconds longer to respond

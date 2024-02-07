# Linux commands

## Getting help

Sometimes we might encounter a command we don't know. The first two steps we can take to familiarize ourselves with the commands in questions is by reading their man pages or the help functions.
man pages contain detailed explanations about a certain command/tool.

Syntax:

`pypypupu@htb[/htb]$ man <tool>`

After looking at some tool usage examples, we can get a list of optional parameters by writing `--help` or `-h` after a tool

There's a tool called `apropos`, which looks through each manual page and prints out a short description based on the given keyword.

Example:

`pypypupu@htb[/htb]$ apropos <keyword>`

Output for `apropos sudo`:

```shell
pypypupu@htb[/htb]$ apropos sudo

sudo (8)             - execute a command as another user
sudo.conf (5)        - configuration for sudo front end
sudo_plugin (8)      - Sudo Plugin API
sudo_root (8)        - How to run administrative commands
sudoedit (8)         - execute a command as another user
sudoers (5)          - default sudo security policy plugin
sudoreplay (8)       - replay sudo session logs
visudo (8)           - edit the sudoers file
```

[A web dictionary for Linux commands](https://explainshell.com/)

## Tips 

You can concatenate multiple commands into one call by using `&` symbol

First thing you do when you reverse shell is run `whoami` to set a basis.

`id` command expands on the `whoami` command prints out effective group membership and IDs. Some group are allowed to only do certain things. So it's important to understand what groups constitute for.

For kernel exploits you should run `uname -r`. 


## System/hardware commands

| Command | Description |
| - | - |
| `env` | Prints environment or sets and executes command |
| `lsblk` | Lists block devices |
| `lsusb` | Lists USB devices |
| `lsof` | Lists opened files |
| `lspci` | Lists PCI devices |
| `uname` | Prints out the basic information about the OS and hardware |
| `ps` | Shows process status |
| `sleep` | With sleep you can make the command line sleep for a certain amount of time before executing any command. |

## User related commands

| Command | Description |
| - | - |
| `who` | Displays who is logged in |
| `whoami` | Displays current username |
| `id` | Returns users identity |
| `hostname` | Sets or prints the name of current host system |

## Networking Commands

| Command | Description |
| - | - |
| `ifconfig` | Used to assign or to view an address to a network interface and/or configure network interface parameters |
| `ip` | Utility to show or manipulate routing, network devices and tunnels |
| `netstat` | Shows network status |
| `ping` | With ping you can ping a server and also cause time delays for the executing server. For example this could be useful in Blind command injection attacks as you could make server processing the request make longer to respond because it is pinging itself or some other IP. | 
| `ss` | Tool to investigate sockets |

## Navigation Commands
| Command | Description |
| - | - |
| `pwd` | Outputs the working directory |
| `ls` | Lists out folder contents |


### `ls`

With `ls` program, we can list out the contents of any folder we want. If we specify a path, the contents of that folder path will be outputted, otherwise, the contents of the folder we are currently at.

| Flags | Description |
| - | - |
| `-l` | This flag displays additional information about folder files. Permissions, number of hard links, owner, group owner, size of the file, date of creation, name |
| `-a` | Lists out hidden files |

### `cd`

Used to navigate through folders.

`cd /file/path`

We can navigate relatively from where we are in the system, and absolutely.

Absolute
`cd /var/www/`

Relative (from /home/some-user)
`cd ../../var/www`

`cd -` used to jump back to last `cd`

Tab can be used for auto-completion.

### `clear`

Clears the shell of previous outputs or `CTRL` + `L`
`CTRL` + `R` for accessing command history.
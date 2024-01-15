# Command-line Interface, shell, terminal, console...

Linux terminal is called `shell` and is used to interact and control with the OS. It provides text-based input/output (I/O) interface between users and the kernel.


## Terminal emulators 

Emulates the function of a terminal. It allows the use of text-based programs within graphical user interface.

Emulators and multiplexers are beneficial extensions for the terminal. They provide with different methods and functions to work with the terminal, such as splitting the terminal into one window, working with multiple directories, creating different workspaces. Such functions are provided by TMUX multiplexer.

## Shell

The most common shell in Linux is Bourne-Again Shell (BASH) and is part of the GNU project. everything we do through the GUI we can do with the Shell. Shell gives much more possibilities to interact with programs and processes to get information faster. Many processes can be easily automated with smaller or larger scripts that make manual work easier.

Other shells include: Tcsh/Csh, Ksh, Zsh, Fish and others.

### Prompt description

It's the banner that is shown as we type the command in the shell. By default it includes information such as user, hostname, current working directory. When it is shown it indicates that system is ready for our input. It can be customized to provide useful info for the user.

By default it looks something like this:

`<username>@<hostname><current working directory>$`

Home directory for a user is marked with a tilde <~> and is the default folder when we log in.

`<username>@<hostname>[~]$`

The `$` stands for `user`. As soon as we log in as root the character changes to `#`.

`root@htb[/htb]#`

Sometimes when we upload and run a shell script on the target system, we may not see the username, hostname, and current working directory. This may be the cause of bad PS1 variable configuration.So instead we might see the user status sign `$` or `#`.

We can customize our shell to display other information. Then in the `.bash_history` we would see that info, which could help us filter information.

| Special Character | Description |
| - | - |
| `\d` | Date (Mon Feb 6) |
| `\D{%Y-%m-%d}` | Date (YYYY-MM-DD) |
| `\H` | Full hostname |
| `\j` | Number of jobs managed by the shell |
| `\n` | Newline |
| `\r` | Carriage return |
| `\s` | Name of the shell |
| `\t` | Current time 24-hour (HH:MM:SS) |
| `\T` | Current time 12-hour (HH:MM:SS) |
| `\@` | Current time |
| `\u` | Current username |
| `\w` | Full path of the current working directory |

Also fonts and color schemes can be customized.

[Bash prompt generator](https://bash-prompt-generator.org/)
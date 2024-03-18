There are two types of services

Internal. Services that are required at system startup. For example they do hardware-related tasks and services installed by the user, which are server services.

These services run in the background and are called `daemons` and such services are identified by a `d` at the end of the name (`sshd`, `systemd`)

`systemd` is an Init process daemon that starts first, thus has the processes ID (PID) of 1. It's main responsibility is - monitoring and taking care of starting and stopping other services. All services have a PID, some have PPID, which is parent process ID, it means the service is a child process.

besides `systemctl`, `update-rc.d` can be used to manage SysV init script links.

To start OpenSSH server we can

`systemctl start ssh`

Then to check if the service was started successfully we can run

`systemctl status ssh`

We can tell SysV script to tell system to start SSH at startup with

`systemctl enable ssh`

We can check running services with `ps -aux`, to check a specific service we can use `grep` 

`ps -aux | grep ssh`

We can also check services with this:

`systemctl list-units --type=service`

Sometimes service will not start, so for that check the logs (`journalctl` command)

## Killing processes

Process can be in one of the following states:

- Running
- Waiting (waiting for an event or system resource)
- Stopped
- Zombie (stopped but still has an entry in the process table)

Processes can be controlled using `kill`, `pkill`, `pgrep`, `killall`. We interact with processes by sending signals to it.

`kill -l` to list out signals.

Common signal to stop a process with no clean-up operations is `kill 9 {pid}`

## Shortcuts 

`ctrl + Z` stops the process, while `ctrl + C` kills the process.

Stopped process can be continued.

You can enter `jobs` to see all stopped processes. To continue process you can write `fg {id}` to continue running the process.

there's also the `bg` command, but i did not really understand it.

## Executing multiple programs

Symbols can be used to queue or let multiple programs run at the same time

- Semicolon (;)
- Double ampersand (&&)
- Pipe (|)

The differences lies in the previous process' treatment and depends on whether the previous process was completed successfully or with errors.

### Semicolon (;)

Sequenced commands with `;` will not get interrupted by a previous command.

`echo 1 ; ls MISSING_FILE ; echo 2`

By running this command you will see that we get no errors.

### Double ampersand (&&)

Commands get interrupted by an error

`echo 1 && ls MISSING_FILE && echo 2`

### Pipe (|)

Not only depends that the commands goes through, but also on the output.

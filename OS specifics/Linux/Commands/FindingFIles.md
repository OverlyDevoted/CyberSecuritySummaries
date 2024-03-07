# Commands for finding files and directories

## `which`

Returns path to a file. Can be used to determine if applications are available on the machine.

`which python`

If there was `python` on the machine, `/usr/bin/python` would be returned.

## `find`

A more sophisticated search application. With this tool, you can also specify search filters such as date, file size, search only for files or folders.

```bash
pypypupu@htb[/htb]$ find / -type f -name *.conf -user root -size +20k -newermt 2020-03-03 -exec ls -al {} \; 2>/dev/null
```

| Option | Description |
| - | - |
| `-type f` | Let's us specify file type we are looking for. IN this case `f` stands for a file. |
| `-name *.conf` | With this flag we indicate the name of the file we are looking for. `*` asterisks stands for all files and the `.conf` at the end means look for all `conf` files |
| `-user root` | Filters all files whose owner is the root user |
| `-size +20k` | Filters files larger than 20KiB |
| `-newermt 2020-03-03` | Only files with a newer than specified date will be displayed |
| `-exec ls -al {} \;` |  |
| `2>/dev/null` | |  

## `locate`

Uses the internal database that contains all information about existing files and folders.

We update the database with

`sudo updatedb`

To search for file with `.conf` extension we need only to type `locate *.conf`. This get results faster than `find` 
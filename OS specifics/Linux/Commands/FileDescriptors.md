# File Descriptors

Is an indicator 
Maintained by the kernel 
and it's used to perform I/O operations

First three file descriptors in Linux:

1. Data Stream for Input
 - STDIN - 0
2. Data Stream for Output
 - STDOUT - 1
3. Data Stream for Output that relates to an error occurring
 - STDERR - 2 

We can use it to filter outputs

For example we can filter out error messages from our commands. If we were to run this command we would get some `Permission Denied` error messages.  

```bash
find /etc/ -name shadow
```

We can filter it by redirecting file descriptors for the errors to `/dev/null`. Which means redirect it to a null device - no device.

```bash
find /etc/ -name shadow 2>/dev/null
```

No we can only see standard output (`STDOUT`). We can also redirect it somewhere, for example, to a file

```bash
find /etc/ -name shadow 2>/dev/null > results.txt
```

We can redirect error and error-less output to files

```bash
find /etc/ -name shadow 2> stderr.txt 1> stdout.txt
```

We can also use `<` symbol to insert something into applications.

```bash
cat < stdout.txt
```

In this case the contents of the file `stdout.txt` were passed along to the cat application as `STDIN`

Greater-than `>` symbol redirects STDOUT or STDERR to another stream. If it's redirected to a file, it always creates a new one and overrides existing ones. `>>` double greater-than appends.

`EOF` end-of-file is a Linux function that resides inside linux system files which denotes the input's end. The double-less-than `<<` signs can be used to read input and with combination of `EOF` and `STDOUT` we can save inputs to a file.

```bash
cat << EOF > stream.txt
> Hello
> my
> Dude
> EOF
```

You can redirect with pipes `|` symbol. These are used when we want one program's output to be used in another. Most commonly it is used for `grep`. `grep` filters out output according to the pattern we provide.

This command is used to find all conf files inside `/etc/` then the output is **piped** to the grep application which highlights string that contain `systemd`

```bash
find /etc/ -name *.conf 2>/dev/null | grep systemd
```

```bash
find /etc/ -name *.conf 2>/dev/null | grep systemd | wc -l
```

Additionally the output of grep can be further outputted to other programs. Such as to `wc` to count how many lines did the grep output contain. 

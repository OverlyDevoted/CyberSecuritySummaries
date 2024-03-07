# Linux permission management 

Permission can be given to users and groups. 
Each user can be a member of a group.
Users possible permissions are determined by individual permission given to the users and by the group he is a member of.

When a file is created by a user, it belongs to him and to the group he is a member of.

To navigate to a directory or execute any application in the directory or referencing it's files, a user must have `execute` permissions on the directory.

To create, delete, rename files and subdirectories the user needs `write` permissions

Permission system is based on an octal system. 

- `r` stands for Read
- `w` stands for Write
- `x` stands for Execute

Permissions can be set for the owner, group and others

```bash
cry0l1t3@htb[/htb]$ ls -l /etc/passwd

- rwx rw- r--   1 root root 1641 May  4 23:42 /etc/passwd
- |_| |_| |_|   |  |    |    |   |__________|
|  |   |   |    |  |    |    |        |_ Date
|  |   |   |    |  |    |    |__________ File Size
|  |   |   |    |  |    |_______________ Group
|  |   |   |    |  |____________________ User
|  |   |   |    |_______________________ Number of hard links
|  |   |   |_ Permission of others (read)
|  |   |_____ Permissions of the group (read, write)
|  |_________ Permissions of the owner (read, write, execute)
|____________ File type (- = File, d = Directory, l = Link, ... )
```

## Change permissions

Permissions can be changed with the `chmod` command

We can add(`+`) or remove(`-`) permissions for owner, users, groups or all users.

*By default the group value is borrowed and set from current owner's group. But we can change the group of a file or a directory with `chown`.*

Example:

```bash
chmod g+x file
```

```
Binary Notation:                4 2 1  |  4 2 1  |  4 2 1
----------------------------------------------------------
Binary Representation:          1 1 1  |  1 0 1  |  1 0 0
----------------------------------------------------------
Octal Value:                      7    |    5    |    4
----------------------------------------------------------
Permission Representation:      r w x  |  r - x  |  r - -
```

## Change owner

```bash
chown <user>:<group> <file/directory>
```

## SUID & SGID

Special permissions can be assigned with the use of Set User ID (SUID) and Set Group ID (SGID) bits. Use to give users special rights to applications. For example we can give a user rights to run programs with the rights of another user.

This may cause security risk, because if applications with possibility of running bash shell are exposed to other users it might be exploited to have `root` access.

## Sticky bits

They can be used to ensure that only the Owner or root can edit, rename, delete a file

If the sticky bit is capitalized (T), then this means that all other users do not have execute (x) permissions and, therefore, cannot see the contents of the folder nor run any programs from it. The lowercase sticky bit (t) is the sticky bit where the execute (x) permissions have been set.
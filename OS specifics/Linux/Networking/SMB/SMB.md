# Server message block

Communications service used to transfer files, printers other data inside a network between network nodes.

May also be called `microsoft-ds` when scanning with `nmap` and is by default is open on 445 port. The SMB runs at Application or Presentation layers of OSI model so it relies on low-level protocols for transfer.

SMB most used protocol is NetBIOS over TCP/IP (NBT).

You can list out available shares (folders) you can connect to with `-L` flag.

`smbclient -L {target_ip}`

Usually to access these shares authentication is needed. Due to misconfiguration some may not have a password, which would allow us to access the files inside smb.

To probe a share you can

`smbclient \\\\{target_ip}\\{share_name}`

With command `help`, you can get a list of available commands.

There's usual commands for exploring files `dir`, `ls`, `pwd`, `cd`.
You can download files with the command `get {file_name}`


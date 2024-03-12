# FTP

File transfer protocol

`sudo apt-get install ftp`

Then to open ftp application write `ftp`

It will open a new ftp type shell. There you can write `?` to get a list of available commands.

To connect to a remote write `open` and enter target `IP`. Then it will ask to login. Some FTP servers may be configured to allow guests to connect. The default username for guest accounts is `anonymous` and a blank or any password since there's no password set for the server.

To download files, write `get` and enter the file name.
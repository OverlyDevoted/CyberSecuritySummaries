# Reconnaissance

## Nmap

Usually first step done to enumerate running services, fingerprint
`nmap -sV --open -oA <ip>`

- `-sV` probes open ports for service/version info 
- `--open` returns only open ports
- `-oG` outputs scan in XML, s|>rIpt kIddi3, Grepable format.
- `-v` verbose

Then we could do a full tcp port scan
`nmap -p- --open -oA ip` 
But this takes long time, so it's better to enumerate already scanned services with netcat.

`nc -nv <ip> <port>`
- `-n` numeric ip, no DNS
- `-v` verbose 


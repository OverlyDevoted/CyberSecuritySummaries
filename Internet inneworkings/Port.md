# Ports

Port acts as a window. I we make a request to a certain port, it may be accepted or rejected depending on whether the port is open on a target machine. Through ports we can gain access to target.

Ports are virtual points where network connections begin and end. They are software-based and managed by the OS. They are associated with a specific process or service and allow computers to differentiate between different traffic types. (SSH traffics flows through different ports than a web application requests even though requests are sent over the same network connection)

There are two types of ports:

## TCP 
**Transmission Control Protocol** is connection-oriented, that means connection between a client and a server must be established first before sending any data. Server must be in a listening state, awaiting for requests from clients.

TCP if packet loss is experienced, a retrasmission is called, so that no data is lost. Used to transmit data tht cannot be lost. 

## UDP
**User Datagram Protocol** utilizes connectionless communication model. There is not "handshake" therefore there's unreliability since there's no guarantee of data delivery.

UDP is useful when error correction/checking is either not needed or is handled by the app itself. Useful for time-sensitive task since dropping packets is faster than awaiting for delayed packets.

## TCP/UDP ports
Both have 65535 different ports.
Some of the most known ports:

| Ports | Protocol |
| - | - |
| 20/21 (TCP) | FTP (file transfer protocol) | 
| 22 (TCP) | SSH |
| 23 (TCP) | Telnet |
| 25 (TCP) | SMTP |
| 80 (TCP) | HTTP |
| 161 (TCP/UDP) | SNMP |
| 389 (TCP/UDP) | LDAP |
| 443 (TCP) | SSL/TLS (HTTPS) |
| 445 (TCP) | SMB |
| 3389 (TCP) | RDP |

[Common ports cheat-sheet](https://packetlife.net/media/library/23/common-ports.pdf)
[Common ports (more verbose)](https://www.stationx.net/common-ports-cheat-sheet/)
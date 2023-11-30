# VPN 

## What is VPN

Virtual private network (VPN) - let's users connect to a private (internal) network and access hosts resources. VPN server acts as a secured communication channel.

VPN works by routing our connecting devices connection through target VPN private server instead of our ISP. When connected to a VPN, data originates from the  VPN rather out device IP

## VPN types

### client-based VPN

Requires client software to establish connection. When connected users host work mostly as if it were connected directly to the companies network and will be able to access any resources allowed by the network.

### SSL VPN

Uses the web browser as VPN client. The connection established between browser and SSL VPN gateway. SSL VPN can be configured to only allow access to web-based applications: email, intranet sites or an internal network without having to install specialized software.

## VPN use

It can be used to:
- obscure our browsing traffic
- disguise our public IP

Still VPN providers can't be 100% trusted. They maybe logging all traffic and if someone hack into their stuff, they would get the data.

[Connecting to HTB vpn:](https://help.hackthebox.com/en/articles/5185687-introduction-to-lab-access)
- Get user.ovpn from the HTB academy
- run `sudo openvpn user.ovpn`
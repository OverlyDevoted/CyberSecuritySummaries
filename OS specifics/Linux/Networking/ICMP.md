# ICMP

Internet Control Message Protocol (ICMP) echo request is used as a Network packet sent to check the reachability of other machines on the network. Also commonly known as a `ping` command.

Work principle

1. Device A sends an ICMP echo request packet to Device B.
2. Device B receives the ICMP echo request.
3. If Device B is reachable and operational, it responds by sending an ICMP echo reply packet back to Device A.
4. Device A receives the ICMP echo reply, confirming the reachability of Device B.
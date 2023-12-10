# Domain Name System (DNS)

Is a system that resolves a supplied IP into a domain name.

Domain names have different parts to them, like **TLD**. **Top-level domain** tells the purpose of a site. It is what goes after the dot of a domain name. There are **gTLD** or **general top-level domains** which contain `.com` (commercial), `.org` (organization), `.gov` (government), `.edu` (education). 
Then there's also **ccTLD** or **Country Code Top-Level domain** which is used for geographical reasons. .ca stands for Canada, .co.uk United Kingdoms and so on. 
Due to popular demand there's been an influx of new gTLD. Here you can find [gTLDs](https://data.iana.org/TLD/tlds-alpha-by-domain.txt)

Second-Level Domain or SLD is the characters that precede TLD, for Google it's google, for TryHackMe it's tryhackme part in tryhackme.com.. SLDs are limited to 63 character and TLDs can only use a-z 0-9 and hyphens (`-`) and cannot start or end with hyphens or have consecutive hyphens.

Subdomain sits on a left-side of a SLD using period to separate it. tryhackme could have a potential admin subdomain, then the URL to tryhackme admin panel would look like this: admin.tryhackme.com. Has the same name length restrictions as SLD. A domain name cannot be longer than 253 characters long

## DNS record types

DNS isn't just for websites and multiple types of records exist.    

- `A` record
These records resolve IPv4(e.g. 102.41.123.15) into domain names.
- `AAAA` record
These resolve IPv6 domain names (e.g. 2606:4700:20::681a:be5)
- `CNAME` record
Resolves into another domain name. So if trychackme had a subdomain store.tryhackme.com that returned `CNAME` record shop.tryhackme.com another DNS request then would be made to resolve that.
- `MX` (Mail exchange) record
Used to specify mail server responsible for receiving and handling email messages for a specific domain. As we know you can have custom emails, so this probably helps to send emails to specific domains. Helps to figure out to what server send emails. 
- `TXT` record
Are free text-fields where any text-based data can be stored. These have multiple uses:
1. List servers that have the authority to send email on behalf of the domain
2. Verify ownership of the domain name when signing up for third-party services.

## DNS Request brake-down

1. When we request a domain name, the local cache is checked first to see if the domain was previously resolved for us, if not, a request to resolve the name is made to the Recursive DNS Server.

2. Recursive server is usually provided by our ISP, but we have a right to choose our own, this server also has local cache for storing recently resolved records. If there's an already cached request, the result is sent back to the requester and the session is ended there, but if not, a journey begins to find the correct answer, starting with `Root DNS Server`.

3. Root servers act as a DNS backbone of the internet, their job is to redirect you to correct TDS, depending on request. So if you request to a `.com` domain, the Root DNS server will redirect to a TLD server that deals with `.com` addresses.

4. The TDL server holds records for where to find the authoritative server to answer DNS request. The authoritative server is also called nameserver for the domain. So for example nameserver for `tryhackme.com` could be `kip.ns.cloudflare.com` and `uma.ns.cloudflare.com`. So the domain main have multiple name servers for availability and time-to-reach purposes.

5. Authoritative DNS server is the server that is responsible for storing the correct resolution for our domain names. Depending on record type, the DNS record is then sent back to the recursive DNS server, where local copy will be cached for future requests and then relayed to the original client that made the request. DNS records all come with a TTL (Time to live) value, that means that cached DNS records expire and need to be retrieved again from the authoritative DNS server. 

[DNS leak test](https://www.dnsleaktest.com/)
| Number | Category | Description |
| 1. | Broken access control | Restriction are not appropriately implemented to restrict access of other users accounts, viewing sensitive data, access unauthorized functionality, modifying data, etc.  |
| 2. | Cryptographic Failures | Failures in cryptography which lead to sensitive data exposure |
| 3. | Injection | User supplied data is not sanitized and validated correctly which leads to SQLi, XSS, Command Injection, LDAP injection |
| 4. | Insecure Design | When application is not designed with security in mind |
| 5. | Security misconfiguration | Missed security hardening opportunities throughout the application stack, left default configs, open cloud storage, verbose error messages which disclose too much |
| 6. | Vulnerable and outdated components | Using components on client or server side that are outdated |
| 7. | Identification and authentication failures | Authentication related attacks that target users identity, authentication and session management |
| 8. | Software and Data integrity failures | Code and infrastructure failures that does not protect against integrity violations. E.g. Application that relies on third-party plugins, libs, modules from untrusted sources, repositories, CDNs |
| 9. | Security Logging and monitoring Failures | This category is to help detect, escalate and respond to active breaches. Without logging and monitoring, no breaches can be detected |
| 10. | Server-Side Request Forgery | These flaws occur when web apps fetches remote resources without validating user-supplied URL. It allows attacker to coerce (persuade, force, make do) send crafted request to an unexpected destination, even when protected by firewall, VPN or another type of network access control list (ACL). |
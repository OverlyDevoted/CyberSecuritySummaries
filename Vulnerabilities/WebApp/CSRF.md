# Cross-Site Request Forgery (CSRF)

Is also caused by unfiltered user input. These utilize XSS to perform queries, API calls on a web app that the victim is currently authenticated to. This allows attacker perform actions as an authenticated user. 
These attacks could also utilize URL parameters for getting access

A common CSRF attack is to gain high privileged access to a web application is by supplying a JavaScript payload that automatically changes victims password to the value set by an attacker. Once the paylaod is viewed by  victim (e.g. comment with XSS)

## CSRF Prevention
There should be measures to filter and sanitize user input in the backend, but it is always important to do that also in the frontend if it would be displayed somewhere on the frontend.

**Sanitization** - Removing special characters and non-standard character from user input before displaying it
**Validation** - Ensuring that submitted user input matches the expected format (e.g. submitted email matches email format (e.g. with REGEX))

Additionally not only on user input submit should be sanitized and validated, but also when it's displayed.

Another solution is [web application firewall (WAF) ](https://en.wikipedia.org/wiki/Web_application_firewall), it checks HTTP for any malicious user input. But it still can be bypassed.

Also there are Headers that help prevent CSRF (e.g. anti-CSRF token or X-XSS-Protection)

[CSRF cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
From that cheatsheet: ```Remember that any Cross-Site Scripting (XSS) can be used to defeat all CSRF mitigation techniques!```

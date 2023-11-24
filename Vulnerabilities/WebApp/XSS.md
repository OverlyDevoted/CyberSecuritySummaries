# XSS

Often if you can inject HTML u will be able to perform an **XSS**. Which is JavaScript injected into HTML, which could possibly give us access to the backend.

XSS Types:
| Type | Description |
| - | - |
| Reflected XSS | Occurs when user input is displayed after processing (e.g. search result or error message) |
| Stored XSS | Is when user input is stored into the backend database and the is displayed in the webpage (e.g. posts, comments) |
| DOM XSS | When user input is directly shown in the HTML DOM object (e.g. vulnerable username or page title) |

With injected JavaScript it is possible to retrieve session cookies, and we get session cookies of other users we could do authenticated commands through other users. 

[OWASP XSS prevention cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## XSS Challenge

Inject some javascript. Injected with: `<img src="" onerror="console.log(document.cookie)">`

# Websites for hacking
1. https://xss-game.appspot.com/
2. https://owasp.org/www-project-top-ten/
3. https://www.hacker101.com/
4. https://hackerone.com
5. https://tryhackme.com/
6. https://ctf.hacker101.com
7. https://www.hackthebox.com/
8. https://overthewire.org/wargames/
10. https://www.hackthissite.org/

Unviewed
https://www.cybersecurityacademy.lt/
https://www.nksc.lt/en/

## Useful resources
### `SSI` - Server Side Includes
https://crashtest-security.com/server-side-includes/

## xss-game
### 1 Challenge
inject `<script>alert()</script>` into the textbox
### 2 Challenge
inject `<button onclick="alert()">click</button>` html element with an onclick event. As it is a post, everyone on the website can trigger it. With img onload you could make script execution automatic
### 3 Challenge
incorrectly escape `img` tag to add additional html tags
### 4 Challenges
incorrectly escape the number for the `startTimer` function and just add an additional function, as all functions are executed in sequence
### 5 Challenge
Modify the value of paramater `next` in the URL with a `javascript:alert()` and the a href attribute will run that inserted code when the button for next page is clicked 
### 6 Challenge
Setup up a server with .js file with alert(). The link for the .js file is supplied through the URL and the URL is checked with a regex that looks for https or http in the text, but it does not include upper case, so just start your host url with HTTPS://   

## hacker101 suggested finding report template
 - Title
 - Severity
    - Informational -- Issue has no real impact
    - Low -- The business impact is minimal
    - Medium -- Potentail harm to users. But not revealing sensitive data
    - High -- Potential to reveal user data or aids in exploitation of other vulnerabilities
    - Critical -- High risk of personal/confidential data exposure, general system compromise, and other severe impacts to the business
 - Description -- Brief description of what the vulnerability is
 - Reproduction steps -- Brief description of how to reproduce the bug; preferably with a small proof of concept
 - Impact -- What can be done with the vulnerability
 - Mitigation -- How is it fixed
 - Affected assets -- Genrally a list of affected URLs

## Vulnerabilities

### rXSS -- reflected cross-site scripting
Parameter that an attacker controls is directly reflected back to a user. This could allow injection of raw HTML or Javascript and allow an attacker to perform attacks in the context of another user

## tryhackme

### Lesson 1
offensive security (attackers) - those that search for vulnerabilities
defensive security (defenders) - someome that tries to protect organization network and secure computer systems 

in essence, defenders have to find all the issues, bugs, exploits, vulnerabilities
while the attackers have to find much fewer

gobuster is a tool for analyzing websites indexes, it runs through a word list and checks indexes based on that
`gobuster -u https://0018c5911fcc0cd47aee43038d62d017.ctf.hacker101.com -w /usr/share/wordlists/dsstorewordlist.txt`

Hydra is a tool to brute force loggin in 
hydra -l admin -P passlist.txt www.onlineshop.thm http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect" -V

There are different security positions:
 - Penetration tester = Checks for possible vulnerabilities and exploits
 - Red teamer - attack the organization and provides feedback from the side of an enemy
 - Security Engineer - designs, monitors and maintains security controls, networks. More of a proactive 

vera crypt
vm inside vm

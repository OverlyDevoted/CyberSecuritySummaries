# Authentication vulnerabilities

Bypassed authentications or stolen authentications can lead to attackers gaining access on sensitive data or functionality. It exposes additional attack surface for further exploits.

## What is authentication 

Process of verifying an identity of user or a client. Authenticated users gain access to additional functionalities on the system. So it's integral to a web app to have an effective security system for protecting their users.

Types of authentication:
- Something you **know**. Password or an answer to a security question. These are also called "knowledge factors".
- Something you **have**. A mobile phone or a security token. "possession factors"
- Something you **are** or do. For example, your biometrics or patterns of behavior. "Inherence factors" 

Different technologies and techniques are used to verify users.

## Authentication and authorization.

Authentication is a process of verifying that the user is who they claim to be. While authorization verifies whether the user are allowed to do something.

We authenticate to the website with our username and password and are then authorized to edit only THEIR owned content.

## How do authentication vulnerabilities arise

1. Authentication mechanisms that are weak because they fail to protect against brute-force attacks.
2. Logic flaws or poor coding in the implementation which allow the authentication mechanisms to be bypassed. It is also called "broken authentication"

## Impact of authentication vulnerabilities

The impact can be severe to business's reputation and integrity. If it is possible to bypass authentication or brute-force their way into another users's account, they have access to all their data and functionality that comes with the account authorization level. If a high-privileged account can be compromised, it could lead to a potential full control gain of the system.

Even authenticating as a low-privileged users can lead to their data loss, such as identity, credit card info or other sensitive data also it exposes a further attack surface, as now attackers may have access to more functionality, additional pages which may have high-severity vulnerabilities.

## Vulnerabilities in authentication mechanisms

- Vulnerabilities in password-based login
- Vulnerabilities in multi-factor mechanisms 
- Vulnerabilities in other authentication mechanisms




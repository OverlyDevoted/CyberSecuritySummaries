# Sensitive data exposure

All frontend components interact with client. Therefore, if they are attacked, they do not pose a direct threat on the core backend. They put an end-user in danger of being attacked and exploited. Front end vulnerabilities could be leveraged to gain access to admin privileges.

Most attacks are focused on the backend ant its functionality, but sometimes frontend vulnerabilities can let us to get into hidden sub-pages.

**Sensitive data exposure** - the availability of sensitive data in clear text. And it's found in the source code.

You can access webpage HTML source code by prefixing `view-source:` to an URL.

Sometimes credentials, hashes, exposed links, directories user information. Which could further be leveraged to gain access to other web system components.

There are automation tools that help reading HTML source code for possible vulnerabilities

## Prevention

Unused code, credentials should not be left, so it's important to review code before publishing it to the public. 
There are Javascript code packing or obfuscation tools that reduce the chances of exposing sensitive data.

## Sensitive Data Exposure Challenge
Check HTML for password which was Sensitive Data Exposure `HiddenInPlainSight`

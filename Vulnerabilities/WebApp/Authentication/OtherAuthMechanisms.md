# Other Authentication Mechanisms

Sometimes login pages may be properly protected, but other mechanisms through which you could authenticate are not. Sometimes *Forgot Password* or *Change Password* pages may introduce some vulnerabilities that could let you change password.

## Keeping users logged in

Often you will find a *Keep me signed in* checkboxes, that keep you logged in between browser sessions. This is usually done through setting some kind of "Remember me" persistent cookie. Possessing this cookie effectively allows you to bypass the entire login process, so it's important for websites to insure that it's impractical to guess. 
There are many ways of generating a value for it. So having a predictable pattern could possible lead to attacker being able to reverse engineer tokens.
Hashing can also be exploitable. 
1. If a two-way encoding like base64 is used, it offers no protection at all, as you can simply google base64 decoder and decrypt the value. 
2. Proper hashing is not bulletproof. Example: If the hashing algorithm can be identified by an attacker, and no salt is used for hashing, then attacker can simply brute-force by hashing their worldlist.

Login attempt lock can be bypassed, if cookie guessing is not protected

### Challenge
Had to figure out that a cookie is received when `Keep signed in` is checked and that cookie is of format: `base64(username+':'+md5(password))`. User name and a list of passwords was given. So I just had to try brute-force into `GET /my-account` with header `Cookie: base64(username+':'+md5(password))`
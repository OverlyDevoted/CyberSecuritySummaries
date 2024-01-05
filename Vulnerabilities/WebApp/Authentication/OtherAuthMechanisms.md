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

Even without a way to sign in yourself, it could be possible to steal cookies through injecting XSS.
*Note. It is sometimes possible to get local storage data and cookie data from an user by injecting a XSS, that redirect them to your server page with their data as params. Then in the request URI you can inspect inserted values*

## Password reset
Since it is common for users to forget their usernames, websites with user authentication provides an option for users to reset their passwords. Most common way of resetting is through sending an email to the registered email with a page link, that is when accessed redirects user to the reset password page.

### Sending passwords to emails
Users should never get their passwords sent to them via email. Sometimes websites send users a newly generated password. But this type of reset is highly susceptible to a man-in-middle attacks.

Email is generally not considered **secure** given that inboxes are both persistent and not really designed for secure storage of confidential information. So generally the newly generated password should expires quickly, or the user has to change their password quickly

### Resetting password via URL

As previously mentioned, a more robust way of password reset is resetting password via an URL.

The URL has to safe for more difficult identification of users. Links should never look like this:
`http://vulnerable-website.com/reset-password?user=victim-user`

The other way is to generate a high-entropy *(high disorder, low energy)*, hard-to-guess token and create password reset URL based on that.
`http://vulnerable-website.com/reset-password?token=a0ba0d1cb3b63d13822572fcff1a241895d893f659164d4cc550b421ebdd48a8`
So when the site is visited, the token is then checked against the back-end and if the token exists somewhere, if yes, then it determines which user's password should be reset. After password reset - the token is deleted.

It is also important to validate the token when the password reset form is submitted. An attacker could simply reset from their own account, delete the token and leverage the page to reset any arbitrary users's password

### Challenge
Send password reset for your account. Go to reset page. Submit reset, but intercept. Change username to victim's username. Login in into victim.

If the URL in the reset is generated dynamically, this may also be vulnerable to **password reset poisoning**. An attacker could potentially steal another user's token and use it change their password

### Challenge
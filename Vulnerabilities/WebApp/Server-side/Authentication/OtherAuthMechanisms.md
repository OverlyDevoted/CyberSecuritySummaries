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

### Challenge *Password reset broken logic*
Send password reset for your account. Go to reset page. Submit reset, but intercept. Change username to victim's username. Login in into victim.

If the URL in the reset is generated dynamically, this may also be vulnerable to **password reset poisoning**. An attacker could potentially steal another user's token and use it change their password

### Challenge *Password reset poisoning via middleware*
Performing password poisoning. As the user click on every link he get into his email. We have to send him a password reset email. Somehow, if we send the email reset email with a `X-Forwarded-Host` with our server as a value, we would proxy the request and we could view the generated token for password forgot-reset. With that, we reset to any password we want. 
**Lesson extracted** - vulnerabilities with URLS, sometimes can be exploited by including extra headers, in this case `X-Forwarded-Host`, also sends the request to the specified server IP, so we setup a server that can output request data and from that we can extract sensitive data. 

### Challenge *Password brute-force via password change*
Gather all HTTP requests. You are given an account, change passwords with it and try to do all the possible combinations - resetting with a correct current, reset with an incorrect current but matching new, reset with a correct password but not matching passwords. When sending a request the body consists of these parameters: username, currentPassword, newPassword, newPasswordRepeat. So with that we try other usernames *(given one was carlos, so we immediately try that)*, with all requests, we will probably notice, that almost all requests respond to us with `302 /login`, but when intercepting a request with a correct password and not matching passwords, we get a `200 /my-account` response with a message `Incorrect current password`. This tells us that we can brute-force this request with different passwords to see if we get a `Not matching passwords` message which would indicate that brute-forced password is the login password. After doing that we actually extract a password for user `carlos`.
**Lesson learned** - With a previous challenge we see that password-change features could be vulnerable to the point where an attacker does not even have to be logged in to change password. 

## Preventing authentication vulnerabilities
There general principles for implementing authentication mechanisms.
### Take care wit user credentials
Never send data over unencrypted connections. Even with HTTPS, your login request may not be safe, all HTTP for your login have to be redirected to HTTPS.
Applications should be audited to make sure that no email or password are disclosed either through publicly accessible profiles or reflected in HTTP responses.
### Don't count on users for security
Strict authentication rules may lead to users trying to mediate the effect of them by making some part of this process for themselves easier. So that makes it easier for attackers to crowbar as strict policies could lead to predictable passwords, that's why strength checkers are encouraged. `zxcvbn` library for JavaScript checks password strength and that enforces users to create less predictable passwords.
### Prevent username enumeration
It is easier to exploit a system if there's a way to uncover if an users exists on the system. On certain systems even knowing the username may be sensitive.
Using generic error message for logins, make response times for correct/incorrect supplied usernames more or less equal.
### Implementing robust brute-force protection
It is simple to send brute-forcing attacks, so it's important to take the steps to prevent or at least disrupt brute-force login attempts.
1. Implement IP-based user rate limiter, and prevent attackers from easily manipulating their apparent IP address.
2. Implement CAPTCHA after login limit is reached, but think are there ways of resetting the limit, and would it now allow brute-forcing?
Taking all these measures still may lead to some part that is possible to brute-force, but making it as difficult as possible could lead to attackers abandoning your system.
### Triple-check your verification logic.
Verification is not a stranger to logic flaws. So auditing verification and validation thoroughly is a key to robust authentication.
### Don't forget supplementary functionality
Do not only focus on central login pages and try not to overlook additional functionality related to authentication. This is important when an user can register and login himself, as the attacker has an additional attack surface with that.
### Implementing proper multi-factor authentication
It may not be practical for every website, but when done properly it is much more secure than password-based login. Remember that verifying multiple instances of the same factor is not true multi-factor authentication. Sending codes to email is just a long-winded form of single-factor authentication.
SMS-based 2FA is technically verifying two factors (something you know and have). However, the potential for abuse through SIM swapping, this means the system may be vulnerable.
Ideally 2FA should be implemented using a dedicated device or app, that generates the verification code directly. 
And also remember that sound logic is as important as the 2FA itself.  
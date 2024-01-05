# Vulnerabilities in password-based authentication

In these applications that adopt password-based authentication mechanism, users either register for an account themselves or are assigned to an account by an administrator. The account is associated with a username and a password, which are entered into a form in order to authenticate themselves.

There are various ways of obtaining or guessing the credentials.  

## Brute-force 

Is a process of trying to guess the password through trial and error. These are usually automated attacks that use a wordlist to try out all the usernames and passwords. A user may try out many login attempts to see which one works out.

Brute-force can be directed. That means with logic and publicly available info, the brute-force attack may be fine-tuned to include more appropriate attempts at passwords considering the context.

### Brute-forcing usernames

Usernames are easy to guess if they conform to a pattern, such as `fistname.lastname@somecompany.com`. Additionally, without a pattern some common names can be used for account names. Such as `admin` or `administrator` for high-privileged accounts

During auditing, it should be checked if the app
- Publicly discloses usernames or emails
- Can user profiles be accessed without logging in.
- Check HTTP responses for potential leaks

### Brute-forcing passwords

Passwords can also be brute-forced, with the difficulty varying based on the strength of the password. Usually websites adopt some form of password policy, which forces users to create high-entropy passwords, which theoretically are harder to crack with brute-force alone.
Usually policy rules for passwords are:
- Minimum number of symbols
- Mixture of lower case,upper case letters
- Special characters.

While some users create difficult passwords, some might crowbar it to please security rules for their existing simple password. For example: `mypassword` might be changed into `MyPassword1` or `MyPa$$w0rd1` instead. In systems where password changes are frequent, users may add simple additions to their passwords: `MyPassword1?` and so on. 

It's important to fine-tune brute-force attacks as just enumerating through all possible characters is the least effective way.

## Username enumeration

Username enumeration is when an attacker can send attacks to the login form with different usernames and observe changes in the website's behavior based on the response to a given username.

Example is when you enter a correct username but an invalid password, the system may throw some indication that user exists but the password is incorrect, or when registering, you can't register with the supplied username.
These are the places that may give us an indication of valid usernames:
- Status codes. If a correct guess returns a different status code from incorrect ones. Though usually websites will always return the same status code no matter whether the username is correct or not.
- Error messages: Sometimes error messages vary based on whether username AND password are incorrect or if just the password is incorrect. That's why it's good practice to use same generic messages when authenticating.
- Response times. If most of the requests were handled with a similar response time, any deviation may indicate that the system was doing something additional and may indicate correct usernames. This can occur when the username is correct it goes to check for password so then it takes longer. This extra step increases response time. So it's best practice to try make your request response time take the same amount of time as all other requests.

## Flawed brute-force protection

Brute-force protection usually revolves around making it more difficult to automate the process of enumerating usernames or passwords.
Two most common ways of doing that:

1. Locking account after too many login attempts
2. Blocking remote IP address if they make too many login attempts too quickly

Both are not invulnerable and can be exploited due to logic flaws in implementation.
Sometimes you may find that your IP gets blocked after too many login attempts. So some implementations may have a counter that counts unsuccessful logins and resets after a successful login. So to circumvent the counter, just login in from time to time to reset the counter.
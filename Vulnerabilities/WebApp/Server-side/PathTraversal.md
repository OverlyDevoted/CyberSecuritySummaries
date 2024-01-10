# Path traversal
It means that the attacker can traverse the directories of the server and open files or even write files. This could potentially lead to:
- Application code and data
- Credentials for back-end systems
- Sensitive operating system files
This could even lead to an attacker gaining access to the server.

## Reading arbitrary files via file traversal

Imagine a shopping site that displays items for sale. It might load the image by following HTML:
`<img src="/loadImage?filename=218.png">`

This means that the image is retrieved from the servers directory `/loadImage` folder and with a parameter `filename` we can retrieve an image inside this folder. In this case image `218.png` is retrieved.

Some applications might not even have any protection for path traversal attacks. As a result, an attacker could request any arbitrary file on the filesystem by specifying the file and path to the file:
`https://<server>/loadImage?filename=../../../etc/psw` this works considering that in the example the server is located at `/var/www/`.

On unix-based OS `/etc/passwd` is a standard file containing details of users that are registered on the server. Of course, other sensitive files could be found and retrieved this way.
On Windows both `\..` and `/..` are valid traversal sequences, so an equivalent file that has users listed is `/windows/win.ini`. 

### Challenge *File path traversal, simple case*
Go to any category, edit HTML, click on `Select Element`, select the image, copy image source and traverse to the `/etc/psw` by inserting the URL into the browser. It was something similar to this: 
`https://<server>/loadImage?filename=../../../etc/psw`

Any user input that is placed into file paths would probably have defenses against path traversal attacks. Though these can be often bypassed. 

Application might block or strip path traversal symbols, but it might be possible to bypass these defenses. 

As you know, in linux you can enter `cd /etc` and it would directly get you to that folder. So in some instances it would be possible to do that in some websites too. Just `filename=/etc/passwd`
Or there's logic flaws in how escape sequences are removed, for example website might remove all instances off `../` in a string, but if we encoded our string like this `...//` then the middle `../` gets stripped and then we are left with a `../` which then is used to path traverse.

### Challenge *File path traversal sequences stripped with superfluous URL-decoder*
How to traverse traversal sequences stripped with superfluous URL-decoder
The sequence gets decoded and stripped
App blocks input that contains traversal sequences
Then URL-decoding is performed before using input

So the only thing that was needed was to double url-encode the `/` with `%252f` and send this parameter payload `..%252f..%252f..%252fetc%252fpasswd`

### Challenge *File path traversal, traversal sequences blocked with absolute path bypass*
In this challenge we could traverse by specifying an absolute path

### Challenge *File path traversal, traversal sequences stripped non-recursively*
Traversal sequences are stripped non-recursively so we can just input nested traversal sequences similar to this `....//` - the inner sequence gets stripped and as a result normal sequence is left and we can traverse.

### Challenge *File path traversal, validation of start of path*
A file may need to be finished or started a certain way. In this case application checks if the input string starts with a `/var/www/images`. That can be bypassed with adding path traversal sequences. As a results we get this string: `/var/www/images/../../../etc/passwd`

### Challenge *File path traversal, validation of file extension with null byte bypass*
In this example the application checks if the input needs to ends with a file extension string `.png`. To exploit this we can add a null byte which effectively terminates the file path before the required extension. So
`../../../etc/passwd%00.png`

## Preventing Path Traversal attacks

The most effective way is to avoid passing user supplied input into filesystem API altogether. Many applications that do, can be rewritten to use more static ways of retrieving needed data.

If user input cannot be avoided, these were the recommendations from PortSwigger:

1. Validating user input before processing it. Ideally the input should be checked against a whitelist of possible values. If that is not possible, then it should be checked if the input contains only alphanumerical symbols.
2. After validating, append the input to the base directory, and then use the filesystem API to canonicalize (normalize) the path and check if the canonicalized value starts with the base directory.

Code for canonicalizing validated input:

```java
File file = new File(BASE_DIRECTORY, userInput);
if (file.getCanonicalPath().startsWith(BASE_DIRECTORY)) {
    // process file
}```

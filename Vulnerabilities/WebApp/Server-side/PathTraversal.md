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
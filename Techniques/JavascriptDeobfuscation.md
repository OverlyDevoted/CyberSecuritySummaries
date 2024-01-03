# What is Obfuscation

When developers want to hide certain functionalities they may obfuscate their code. As testers we would like to know what some code is doing to reverse engineer or just analyze. 

## Web app client

Usually all browser client-side apps contain HTML that describes the website structure, CSS to style the structure and Javascript that performs any programmatic or dynamic functionality.

## Code obfuscators

They usually turn some code into difficult to comprehend one. This may slow down the speed of the application, but makes harder to read and interpret. 

Obfuscating is usually done with an automated tool, that takes some piece of code and turns it into a dictionary of words used in the code and attempts to rebuild the code by referring to the dictionary.

### Reasons to obfuscate
1. Make it harder to read, interpret, copy code without permission
2. Provide a security layer
3. For malicious attacks

As obfuscated code is more difficult to interpret it may pass Detection and Prevention systems, and that let's us to exploit web apps.

## Obfuscation tools

There are many tools, but tools can also be written by hand, which may make it more difficult to deobfuscate.

### [Minifying JS](https://www.toptal.com/developers/javascript-minifier)

One way to obfuscate JS and overall make it take up less memory is by using 

### [Packing JavaScript code](https://beautifytools.com/javascript-obfuscator.php)

It turns our JavaScript code into seemingly unintangible scramble of letters. The generated code turns itself into a string that usually is decoded by all the functions, conversions and encodings and then is evaluated to be run.

This method is called packing as seen in from the function signature `function(p,a,c,k,e,d)`. All words and symbols of the code are converted into a list or a dictionary and then are referred to using `(p,a,c,k,e,d)`

## [Advanced obfuscation](https://obfuscator.io/)
It can make the even harder to read, as with previous methods, some string can still be cleartext, which is not ideal when trying to obfuscate. 

With this obfuscator any remnants of old code should be unrecognizable.

## Deobfuscation

As there are tools to obfuscate and minify, there's also tools to attempt to deobfuscate and to beautify

### Beautify
We can beautify minified code inside dev-tools or use a [web tool](https://beautifier.io/)

### [Packed code deobfuscator](https://matthewfl.com/unPacker.html)

For custom obfuscated code you would have to reverse engineer code. That includes interpreting and understanding how the code was obfuscated

## Results of deobfuscation

It may reveal to us code functionalities 



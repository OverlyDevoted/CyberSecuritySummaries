# Obfuscating attacks using encodings 
When constructing an attack it is important to identify where exactly the attack is being injected. Understanding how the attack is being decoded let's us apply techniques to encode our payloads in ways that it passes validation and sanitization.

Often injections consist of HTML tags, JavaScript functions or SQL queries, so websites try to block these types of payloads. It's vital that the decoding performed when checking the input is the same as the decoding performed by the back-end server or browser when it eventually uses the data. Any discrepancy may lead to an attacker sneaking in harmful payloads by applying different encodings.

## Obfuscation via URL encoding

In URL's some character carry special meaning. For example `&` is used to separate query parameters. But sometimes, as developers we want them to be used in a search query. Browsers will substitute `&` in url parameter as `%26`
`/?search=Fish+%26+Chips` this ensures that the `&` is not a delimiter for parameters. 
Any URL-based input is automatically URL decoded server-side before it is assigned to the relevant variables. 
So for a server sequences `%22`, `%3c`, `%3e` are synonymous with `"` `<` `>`. So we could inject URL encoded text `%53%45%4C%45%43%54` and it would be decoded into `SELECT`.

## Obfuscation via double URL encoding

Let's say we wanted to inject `<img src=x onerror=alert(1)>` we could URL encode it like this: 
`[...]/?search=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E`
But some WAF(web app firewall) may detect it as an injection and block it so we could double encode the `%` as `%25` so now we would send
`[...]/?search=%253Cimg%2520src%253Dx%2520onerror%253Dalert(1)%253E`

## Obfuscation via HTML encoding

In HTML some special characters are also used to delimiter tags and such, so encodings may be used. To encode a character we may use this pattern: `&name|dec|hex;`. So for example a colon `:` could be encoded as such: `&colon;` or `$#58;` or `&#x3a;` and this values will be automatically decoded inside HTML tags text content or attribute value. so with earlier URL encoded injection if the server checks for `alert()` functions inside payloads we could encode our alert a letter with `&#x61`, which would bypass the alert check so:
`<img src=x onerror="&#x61;lert(1)">`

### Leading zeroes
You can add any number of zeroes at the start of the hex or decimal encoding 
`<a href="javascript&#00000000000058;alert(1)">Click me</a>`

## Obfuscation via XML encoding
Same as in HTML, XML also supports character encoding using numeric escape sequences. Usually used to bypass WAF as XML payloads are usually processed server-side.

```xml
<stockCheck>
    <productId>
        123
    </productId>
    <storeId>
        999 &#x53;ELECT * FROM information_schema.tables
    </storeId>
</stockCheck>
```

## Obfuscation via UNICODE escaping
Unicode escape sequences consist of the prefix `\u` followed by a four-digit hex code for the character. `\u003a` represents a colon `:`. ES6 also supports unicode escaping using curly braces.

This allows to obfuscate client-side payloads just like with HTML. Let's say our input gets fed through an eval function and our initial payload does not go through we could insert and unicode encoded symbol:
`eval("\u0061lert(1)")`

## Obfuscation via hex escaping
or we could do hex escaping `\x` for example `a` is represented with `\x61` 
`eval("\x61lert")`
Don't forget that it's possible to obfuscate SQL statements using prefix `0x`.
`0x53454c454354` = `SELECT`

## Obfuscation via octal escaping

It's also possible to use base-8 for encoding characters.
`eval("\141lert(1)")` in this case `\141` is `a` symbol

## Obfuscation via multiple encodings

It's possible to use multiple encodings to encode payload
`<a href="javascript:&bsol;u0061lert(1)">Click me</a>`
`&bsol` is a backslash and `u0061` is `a` 

An understanding in what order the encodings are decoded is important

## Obfuscation via SQL `CHAR()` function

`CHAR()` function turns dec or hex number into a character. So it's possible to inject characters with that.
Both `CHAR(83)` and `CHAR(0x53)` return a `S`

if this was injected into as an SQL `CHAR(83)+CHAR(69)+CHAR(76)+CHAR(69)+CHAR(67)+CHAR(84)` will construct into a `SELECT` and execute the query.
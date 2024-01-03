# Encoding and Decoding

## Base64
### Spotting 
The count of letters should be divisible by 4 and if it's not then `=` symbol is appended to the end. 
Example:
`ZG8gdGhlIGV4ZXJjaXNlLCBkb24ndCBjb3B5IGFuZCBwYXN0ZSA7KQo=`
### Encode
In linux to encode string into base64 we can:
`echo <text> | base64`
### Decode
`echo <text> | base64 -d`

## Hex
In linux we can retrieve ASCII table like this:
`man ascii`
### Spotting
Only consists of symbols `0-9` and `a-f`.
### Encode
`echo <text> | xxd -p`
### Decode
`echo <text> | xxd -p -r`

## Caesar/Rot13
Old and common encoding technique, which shifts each letter by a fixed number. For example shifting by one `a` would turn into `b`, `b` into `c` and so on. And most common variation is rot13, which shifts 13 times forward according to ascii dec.
### Spotting
It usually comes with experience. With time recognizing similar strings indicates caesar or rot13. Example `http://www` in rot13 is `uggc://jjj`
### Encoding
There's no shorthand command for that, but it can be constructed manually as such:
`echo https://www.hackthebox.eu/ | tr 'A-Za-z' 'N-ZA-Mn-za-m'` (tr - linux command that translates. It can turn symbols into another symbols, find string, replace, delete symbols. [Reference](https://www.geeksforgeeks.org/tr-command-in-unix-linux-with-examples/))
### Decode
`echo uggcf://jjj.unpxgurobk.rh/ | tr 'A-Za-z' 'N-ZA-Mn-za-m'`
[Online tool](https://rot13.com/)

## Other encodings
There are a hundred of different encodings. So it's important to try identify if you want to learn different encodings.

There's a [tool](https://www.boxentriq.com/code-breaking/cipher-identifier) that can help identify encodings
| Data type | size    | primitive/reference | value                          |
| --------- | ------- | ------------------- | ------------------------------ |
| boolean   | 1 bit   | primitive           | true or false                  |
| byte      | 1 byte  | primitive           | -128 to 127                    |
| short     | 2 bytes | primitive           | 2^16                           |
| int       | 4 bytes | primitive           | 2^32                           |
| long      | 8 bytes | primitive           | 2^64                           |
| float     | 4 bytes | primitive           | fractions up to 6-7 digits     |
| double    | 8 bytes | primitive           | fractions up to 15 digits      |
| char      | 2 bytes | primitive           | saves a character/ ASCII value |
| string    | varies  | reference           | saves a sequence of characters |
| array | varies | reference | saves an array of items |
| object | varies | reference | instances of classes |

Primitive values are saved on a stack. While heap are reference on the heap

## Data type coercion

If you have a string and you want to convert it to int or double you can use type class methods.

`Integer.parseInt("3")`
`Double.parseDouble("3.2")`



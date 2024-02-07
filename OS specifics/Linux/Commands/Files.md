# Working with files and directories 
In Linux, you can navigate and create files using commands. Moreover you cna edit them, without using an editor, such as `vim` or `nano`.

With terminal, you can access files directly in fewer lines of code and edit and modify them selectively with `regex`. You can run multiple commands simultaneously and redirect the output to a file.

This let's us automate many processes.

## Create, move, and copy

### `touch`

Used to create an empty file 

`touch <file-name>` - or any other file name/extension

### `mkdir`

Used to create an empty directory

`mkdir <directory-name>`

With flag `-p` we can create a folder hierarchy

Let's say we wanted folder `Storage` to contain folder `local`, folder `local` contain `user`, `user` contain `documents`.

`mkdir -p Storage/local/user/documents`

### `tree` 

Let's us to view folder structure

### `mv` 

Let's us to move/rename folders and directories

To move:

`mv <file/directory> <path-sequence>`

To move multiple

`mv <multiple files/directories> <path-sequence>`

To rename:

`mv <file/directory> <renamed-file/renamed-directory>`

### `cp`

Used to copy files
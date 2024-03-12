# Package management

As a Linux administrator it's important to understand how to install, update or remove packages.

Packages are archives that contain binaries of software, configuration files, information about dependencies and keep track of updates and upgrades. 

Package management system features:

- Package downloading
- Dependency resolution
- A standard binary package format
- Common installation and configure location
- Additional system-related configuration and functionality
- Quality control

Different package management system handle different types of files (.deb, .rpm, .dpkg). Usually Linux distros have their own package management. When installing packages, necessary changes to the system are retrieved and made to get the system ready for installation, then dependency checking done and other packages needed for the package are installed.

When deleting packages, package info is retaken, modifies it based on its configuration and the files are deleted.

Package management programs:

| Command | Description |
| - | - |
| `dpkg` | The dpkg is a tool to install, build, remove, and manage Debian packages. The primary and more user-friendly front-end for dpkg is aptitude. |
| `apt` | Apt provides a high-level command-line interface for the package management system. |
| `aptitude` | Aptitude is an alternative to apt and is a high-level interface to the package manager. | 
| `snap` | Install, configure, refresh, and remove snap packages. Snaps enable the secure distribution of the latest apps and utilities for the cloud, servers, desktops, and the internet of things. |
| `gem` | Gem is the front-end to RubyGems, the standard package manager for Ruby. |  
| `pip` | Pip is a Python package installer recommended for installing Python packages that are not available in the Debian archive. It can work with version control repositories (currently only Git, Mercurial, and Bazaar repositories), logs output extensively, and prevents partial installs by downloading all requirements before starting installation |
| `git` |  	Git is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals. | 

## Advanced Package Manager (APT)

Debian-based Linux machines use APT. A package is an archive file containing multiple `.deb` files.

`dpkg` utility is used to install programs from the associated `.deb` file. `APT` handles dependencies and installation.

Every distribution uses software repositories which are basically list of softwares officially available for download. When we try to install something through apt, the repository is queried to retrieve information and then data about a package. We can check the repository. The file for the repository can be found at `/etc/apt/sources.list`.

APT uses a database called APT cache, which contains information about installed packages on the system. 

Info about a package:

`apt-cache search impacket`

Detailed info:

`apt-cache show impacket-scripts`

List of installed packages

`apt list --installed`

### DPKG

It's also possible to download packages with `wget`

`wget http://archive.ubuntu.com/ubuntu/pool/main/s/strace/strace_4.21-1ubuntu1_amd64.deb`
`sudo dpkg -i strace_4.21ubuntu1_amd64`
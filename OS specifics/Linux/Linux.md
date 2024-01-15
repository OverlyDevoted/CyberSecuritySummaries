# General Linux knowledge

## History

Unix OS was created by Ken Thompson and Dennis Ritchie in 1970. Then a Berkeley Software Distribution was released in 1977, but since it contained Unix code owned by AT&T (because original creators worked there when they created UNIX) it limited BSD. Then Richard Stallman initiated GNU project in 1983. His goal was to create a free Unix-like OS and part of his work resulted in GNU General Public License (GPL) being created. Other projects in the following years failed to result in a working, free kernel until Linux.

Linux was created as a personal project started in 1991 by a Finnish student named Linus Torvalds. And his goal was to create a new, free OS kernel. Over the years, the Linux kernel has gone from a small number of files written in C under licensing that prohibited commercial distribution to the latest version with over 23 million source code lines and licensed under GNU general public license.

Linux is available in over 600 distributions (Linux Distribution - an OS based on the Linux kernel and supporting software and libraries).
Most popular Linux distributions: Ubuntu, Debian, Fedora, OpenSUSE, elementary, Manjaro, Gentoo Linux, RedHat, Linux Mint.

Linux is considered more secure than other OS. While there has been kernel vulnerabilities in the past, it is becoming less and less frequent. It is less susceptible to malware than windows and frequently updated. Linux is very stable and affords very high performance to the end-user. But does not have as many hardware drivers as Windows so it's harder to setup.

Since Linux is open-source it can be modified and distributed commercially or non-commercially. 

Linux is usually run on servers, mainframes, desktops, embedded systems such as routers, televisions and video game consoles. The overall Android OS is based on the Linux kernel. Because of that Linux is considered to be the most widely installed operating system.

An OS is software that manages all of the hardware resources associated with our computer. This means that the OS manages the communication between software and hardware

## Philosophy

Linux follows these 5 principles:

| Principle | Description |
| - | - |
| Everything is a file | All configuration files for the various services running on the Linux OS are stored in one or more text files |
| Small, single-purpose programs | Linux offers many different tools that we will work with, which can be combined to work together (not actually connected, but one program's output is another's input) |
| Ability to chain programs together to perform complex tasks | The integration and combination of different tools enable us to complete many complex tasks, such as processing or filtering data |
| Avoid captive user interfaces | Linux is designed to work mainly with the shell (or terminal), which gives greater control over the OS |
| Configuration data stored in a text file | For example **/etc/passwd** file, stores all users registered on the system |  

## Components

| Component | Description |
| - | - |
| Bootloader | A piece of code that runs to guide the booting process to start the operating system. Parrot Linux uses the GRUB Bootloader |  
| OS kernel | The main component of the OS. It manages the resources for the system's I/O devices at the hardware level |
| Daemons | Background services are called "daemons" in Linux. Main functions are to ensure that functions such as scheduling, printing and multimedia are working correctly. These small programs load after we booted or log into the computer |
| OS shell | The OS shell or the command line interpreter is the interface between the OS and the user. This interface allows the user to tell OS what to do. The most commons shells are Bash, Tcsh/Csh, Ksh, Zsh, Fish |
| Graphics server | This provides a graphical sub-system (server) called "X" or "X-Server" that allows graphical programs to run locally or remotely on the X-Windowing system |
| Window manager | Also know as graphical user-interface (GUI). There are many options GNOME, KDE, MATE, Unity, Cinnamon. A desktop environment usually has several applications, including file and we browsers. These allow users to access and manage essential and frequently accessed features and services of OS |
| Utilities | Applications or utilities are programs that perform particular functions for the user or another program | 

## Linux architecture

Linux OS can be broken down into these layers:

| Layer | Description |
| - | - |
| Hardware | Peripheral devices such as the system's RAM, hard drive, CPU and others |
| Kernel | The core of the Linux OS whose function is to virtualize and control common computer hardware resources like CPU, allocated memory, accessed data, and others. The kernel gives each process its own virtual resources and prevents/mitigates conflicts between different processes | 
| Shell | A command-line interface (CLI), also known as shell that the user can input commands to execute kernel's functions |
| System utility | Makes available to the user all of the operating system's functionality |

## File system hierarchy

The Linux operating system is a structured in a tree-like hierarchy and is documented in the Filesystem Hierarchy standard (FHS). Linux is structured with the following standard top-level directories:

![Filesytem](./../../Images/Linux/LinuxFileSystem.bmp)

| Path | Description |
| - | - |
| `/` | The top-level directory is the root filesystem and contains all of the files required to boot the OS before other filesystems are mounted as well as the files required to boot the other filesystems. After boot, all of the other filesystems are mounted at standard mount points as subdirectories of the root |
| `/bin` | Contains essential command binaries (a pre-compiled program that is ready to be run in a given OS the the program is compiled for) |
| `/boot` | Consists of the static bootloader, kernel executable, and files required to boot the Linux OS |
| `/dev` | Contains device files to facilitate access to every hardware device attached to the system |
| `/etc` | Local system configuration files. Configurations files for installed applications may be saved here as well |
| `/home` | Each user has a subdirectory here for storage |
| `/lib` | Shared library files required for system to boot |
| `/media` | External removable media devices such as USB devices are mounted here |
| `/mnt` | Temporary mount point for regular filesystems |
| `/opt` | Optional files such as third-party tools can be saved here |
| `/root` | The home directory for root user |
| `/sbin` | This directory contains executables used for system administration (binary file systems) |
| `/tmp` | The OS and many programs use this directory to store temporary files. This directory is generally cleared upon system boot and may be deleted at other times without warning |
| `/usr` | Contains executables, libraries and man files, etc. | 
| `/var` | This directory contains variable data files such as log files, email in-boxes, web application related files, cron files, and more. |

## Linux distributions 

Or distros are OSes based on Linux kernel. They have various purposes, from servers and embedded devices to desktop computers and mobile phones. 

Each are different with their own set of features, packages and tools. 

Many users choose Linux because it is free, open-source and highly customizable. Ubuntu and Fedora is a popular choice for beginners. It is also widely used as a server OS, because it is secure, stable and reliable and comes with frequent updates.

As cybersecurity specialists because it is open-source and that makes it available for scrutiny (critical observation or examination) and customization. We can optimize and customize our Linux distro the way we want and configure it for specific use cases.

For cyber security specialist these are the most common Linux-based distros
- ParrotOS
- Ubuntu
- Debian
- Raspberry Pi OS
- CentOS
- BackBox
- BlackArch
- Pentoo

The main differences between distros are: included packages, UI, tools available. Kali Linux is the most popular distros for cyber security specialists.

### Debian

It used for a wide variety of purposes. It uses an Advanced Package Tool (apt) package manager system to handle software updates and security patches. This helps to keep the up-to-date and secure by automatically downloading and installing security updates as soon as they are available. This can be executed manually or set to do automatically.

It provides many configuration options and is great for advanced users. Because it has such user-base, if any vulnerabilities are discovered they are quickly patched by the developers. The developers have a strong commitment to security, reliability and privacy. This is especially great for systems that run for 24/7.


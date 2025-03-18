## Multitasking

Concurrently run tasks

1. Process-based multitasking. Allows programs to run concurrently
2. Thread-based multitasking. Allows parts of a program to run concurrently. 

What is process vs thread. 

- Thread share the same memory
- Thread context switching is less expensive than between processes 
- Thread communication overhead is lower

Why multithreading is needed?

While one task is getting done start new one, helps us to save time. The task is in no way depended to the other task.

In a single-threaded environment only one task at a time can be performed

CPU cycles may be wasted while waiting. e.g. user input

So multithreading allows idle CPU time to be put to use

## Thread

Is an independent sequential path of execution within a program.

Many thread can be run concurrently within a program.

At runtime, threads in a program exist in a common memory space and can,therefore, share both data and code.

They also share the process (the program itself)

### Main thread

When a standalone application is run, a user thread is automatically created to execute main() method of the application. This thread is called the **main thread**

If no other thread are spawned, when the main finishes executing its code the program terminates

All thread are spawned from the main thread and are called **child threads**

Runtime environment distinguishes between user thread and the daemon thread.

Main is user thread. If not user thread are running the program may terminate if there is no code to run, irrespective of whether any daemon threads are running or not.

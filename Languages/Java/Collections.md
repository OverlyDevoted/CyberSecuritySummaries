Collections are implementations for widely used data structures

- List (ArrayList, LinkedList)
- Set (HashSet, TreeSet)
- Map (HashMap, TreeMap)
- Queue (PriorityQueue, Deque)

Due to the OOP nature of Java, these collections are implemented in a way that can be extended to suit one's needs 

Iterable is the base interface

![alt text](image.png)

![alt text](image-1.png)

## ArrayList

Is a dynamic list for storing elements.

Basic operations: 
- add
- remove
- contains
- isEmpty

Characteristics:
Used for random access through indexes is needed
Memory efficient
Remove and contains O(n)

## LinkedList

Elements are in nodes spread in the memory and are connected

- add
- remove (with index) O(1) as  does not shift elements because they are linked
- clear

Can be used as queue by using `offer` and `poll` (from Deque class). Can also be used as a stack with `push` and `pop` methods

## PriorityQueue

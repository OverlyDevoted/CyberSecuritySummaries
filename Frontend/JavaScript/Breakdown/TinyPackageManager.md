https://github.com/g-plane/tiny-package-manager.git

Neat things found in that project:

## findup

An util that generates a path to a file that is up the file tree

## Generating dependencies information

Everything up to that is reading files and arguments then setting up objects.

`tiny-pml.yml` acts as a lock file and `package.json` acts as package information file

Then dependency information is collected for each package

### collectDeps

`package.json` information is passed and every dependency entry is read and its dependencies are collected.

Each dependency is comprised of a name and version name. Version name is also named constraint.

Deps collections starts with getting a manifest from the lock. If it is not in the lock, then it is fetched from the network.

### resolve

This function gets manifest information. It either gets it from the cache or by fetching from the registry. Then it is added to cache and returned by `resolve` method

Manifest information contains many details about a given package. It contains every version package.json-like description, every version release date.

Then we get the specific version manifest per given constraint or the latest

`topLevel` is used to flatten package tree to avoid duplication

`unsatisfied` when there are dependency conflicts, this may be used

### dependency conflicts

Is checked at dependencies of dependencies and not top level dependencies

Dependency is simply checked by iterating through a stack of dependencies with a dependency and checking their dependencies. If there's a duplicate dependency, their version is checked for conflicts.

So dependency conflict is when there is a mismatch between dependency versions.

### Circular dependencies

If a package is in the stack and it satisfies the semantic version it means its a circular dependency

## Tricks learned

### Returning and assigning

```js
function foo() {
    let b = {count: 0};
    return () => {
        return (b.count = b.count + 1);
    }
}
```

### Parallelize array execution

Wrap an array of promises in `new Promise.all`. With this it is possible to do unified error handling and `await` for all the promises. 

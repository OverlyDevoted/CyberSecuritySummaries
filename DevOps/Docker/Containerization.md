# Containerization

Is it ability to run a simulated computer environment for the purposes of setting up processes

## Virtual Machine | VM

You are using a PC and it has an OS, in a VM context your environment is called the **Host OS**.

**Hypervisor** is a software that enables to run multiple instances of computers inside your computer, or otherwise called, virtual machines

When a virtual machine is spun up another instance of a PC with all of its requirements has to be spun up - it's **own** OS (guest OS), Hypervisor, libraries. That takes a significant amount of resources. 

If we wanted to **scale** VMs we would have to instantiate additional VMs with all that overhead, which makes large scale scalability not really viable.

## Container

Containers start of with **manifests**. Manifests describe the container (Docker file). Based on manifests images are built. Images act as blueprints for running apps. From images containers are created. Below is an example manifest as a docker file:

```dockerfile
FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
EXPOSE 8080
CMD ["node", "server.js"]
```

Containers are also ran on PCs with their Host OS, but instead of a hypervisor, they will have a **runtime engine** (Docker engine).

Containers are created for scaling, they are much more lightweight. Containers instances only have libs/bins needed to run the container and the app, the application it has to run and any additional configs that may be needed. 

As for why we don't need an OS instances is that based on the base image we use for the container it will pull all the needed OS parts to run the container. So everything it needs and nothing it don't

Because containers are much faster and lightweight to run than VMs, it facilitates modular apps over running everything on single machine. All this contributes into building **microservice** infrastructures.

If some CPU power or memory is unused, all remaining resources get utilized by currently running containers.

The containers utilize the Host Kernel to run so it has all the needed pieces to initialize the container

## Sample app

### Java app

Used for serving endpoints to retrieve data from our databases

### React 

UI application that consumes external APIs for data and displays it

### Flask app

Consumes external API and serves REST endpoints

## Pure docker sample app deployment

### Server stack

Hardware <- OS <- docker daemon (docker engine that allows to spin up containers) <- App containers
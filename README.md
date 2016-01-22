# CEAN Stack Project Tracking Application

This project is meant to demonstrate a full stack application using Couchbase, Express Framework, Angular 2, and Node.js.  This particular stack is called the CEAN stack or CANE stack.  With the Object Document Modeling (ODM) tool Ottoman, we can easily create relationships between documents within the application.

## Installation

Download or clone the project from GitHub and run the following via the Command Prompt (Windows) or Terminal (Mac and Linux):

```
npm install
```

This will install all Node.js and Angular 2 dependencies into the project.  With the dependencies available, the TypeScript files need to be compiled into their JavaScript version.  This can be done by executing the following from the Terminal or Command Prompt:

```
tsc -p public/src
```

If there were no compile time errors, you should be left with a JavaScript file for every TypeScript file.

## Configuration

This project expects a Couchbase Server bucket to exist named **comply**.  This bucket name can be changed in the project's **config.json** file.

## Running the Project

From the root of the project, in your Command Prompt or Terminal execute the following to run the Node.js backend:

```
node app.js
```

Because the Angular 2 TypeScript files were compiled in the installation step, and because they are bundled with the Node.js code, the application can be accessed via **http://localhost:3000**

## Resources

Couchbase Server - [http://www.couchbase.com](http://www.couchbase.com)

Ottoman - [http://ottomanjs.com](http://ottomanjs.com)

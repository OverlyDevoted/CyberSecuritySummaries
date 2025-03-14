## Webpack.

Used to pack all your project files into joined group of files. JavaScript gets converted into one file

But webpack is somewhat deprecated. It is slow for bigger projects as it took a long time to bundle all the files.

Since webpack converts all javascript into one file, lazy loading cannot really be done

## Babel

Babel was used to polyfill newer JavaScript version and babel was used to convert it to ES5 as newer version were still not supported in all the browsers

Webpack and Babel were partly deprecated as newly introduced modularity of JavaScript is better for loading times as features like lazy loading can be used.

[Great video for explaining and setting up Webpack and Babel](https://www.youtube.com/watch?v=X1nxTjVDYdQ)

## Vite

Is an alternative, it uses a more effective modular bundler it bundles files tailored for lazy loading and also has file server capabilities.

To install a new Vite project in a `CMD`

`npm create vite@latest`

Then in the project folder run `npm i` to install all the packages. This is all for the initial setup. Then

## ESLint

Is something that gives more error on code and tries to enforce some more common practices.

To install Eslint run command

`npm init @eslint/config`

Then follow the questions

1. How would you like to use ESLint
   Check syntax and find problems

2. What type of modules does your project use?
   JavaScript modules (import/export)

3. Which framework does your project use?
   For Vanillas JS, choose `none of these`

4. Does your project use Typescript
   Choose this accordingly

5. Where does your code run?
   Choose accordingly

6. What format do you want your config file to be in?
   JavaScript

Then ESLint will ask to install the remaining dependencies and for most resilience do it with `npm`

## Prettier

On save reformats files, this help to have consistent styling between files

`npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier`

create `.prettierrc` file and paste these

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

or if you are using ESLint you can add `"plugin:prettier/recommended"` to `extends`

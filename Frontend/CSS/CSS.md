# Tricks and best practices

## Pseudo-classes

Selectors that usually select based on a certain element state

## Pseudo-elements

Selectors that target a certain part of an element. 

`::before` and `::after` pseudo-elements cannot be added onto self-closing elements

## Combinators

You can select elements based on it's preceding or parent elements

### Descendant selector

Selects all descendants inside the specified element

`div p` - selects all `<p>` elements inside the `<div>`

### Direct descendant selector

`div > p` - selects all `<p>` directly under `<div>`

### Adjacent selector

`div + p` - selects the first `<p>` element after `<div>`

### General adjacent select 
 
`div ~ p` - selects all `<p>` coming after `<div>`

[Cheatsheet](https://appletree.or.kr/quick_reference_cards/CSS/CSS%20selectors%20cheatsheet.pdf)

## Tips

- 🚫 Don't use elements for styling. Plain div, footer, header
- 🚫 Don't use id selectors for styling
- 🚫 Don't use inline styles
- 🚫 Don't use selectors which are more than 3 levels deep

[Plates game](https://toolness.github.io/css-selector-game/#1)

## Normalize

Is a css files that aims to unify all of the elements

[Modern normalize](https://github.com/sindresorhus/modern-normalize)
[Normalize I use](https://cdnjs.com/libraries/normalize)

## Specificity 

CSS is cascaded and it goes through multiple stages

First it cascades the user-agent stylesheet which is defined inside the browser
Then user specified styles in the settings
The website developer stylesheets
Developer !important stylesheet 
User defined !important stylesheet

Styles that are hierarchicly specified later are applied to the elements. But there's one attribute that is considered and that is **specificity**.

For styles elements with higher specificity are applied to the elements.

- inline style - 1000
- ID specificity value - 100
- Class and pseudo-classes - 10
- Element and pseudo-elements - 1
- Wildcard `*` - 0

Then !important directly modifies the style. But !important can override !important

### General rules for manipulating specificity

- Use !important to override 3rd party libraries
- To increase specificity class can be doubled `.class.class`

## CSS units

### relative

`%` - relative to parent's dimensions. MOstly used for fluid layouts
`fr` - means fractions and are used to define grids
`em` - inherits font-size of the nearest parent. Used for scalable font-size 
`rem` - root element font-size 
`vw` - viewport width. 1vw is 1% of viewport's width
`vh` - for height. For sections that take a certain viewport size.
`vmin` - either takes the width or height based on which is smaller. `10vmin`, so if width is bigger than the height, then the 10% of the height pixels will be used
`vmax` - the opposite

Default root font-size is 16px

### absolute

`px` just use this for fixed measures. 

Unless working with actual design that might might be printed. Then use `cm`, `mm`, `in`

## CSS variables

Variables are defined inside of styling blocks like this:

```css
root {
    --color-blue: #0000ff;
    --default-font-size: 24px;
    --default-font-family: sans-serif;
}
```

## Font importing

Google fonts is always an option.

For custom fonts:

Inside of a css file type:

```css
@font-face {
    font-family 'Custom-Font';
    src: url('webfont.woff') format('woff');
}

/* Then specify the font for use*/

:root {
    /*        Custom font   Fallback font  Generic font family*/
    font-family: 'Custom-font', Arial, sans-serif;
}
```

### Typography best practices

- Use proper special characters instead of character where possible. For example instead of using `&` use `&amp` (`&amp` in HTML will be replaced by `&` in the browser)
- Use relative font sizes (em or rem)
- Use unitless line height, that means without `px` or `em` or `rem`
- Always define inside the body (or maybe root)
    a. Font family
    b. font size
    c. line height
    d. color
- For body text best to use values between 16px-24px
- Do not use underline for nothing except links. Consider using *italic* or **bold** or small caps
- Numbers in a table should always be right aligned

[optimizing font loading, could also be used for other images such as data from an api or images](https://web.dev/articles/optimize-webfont-loading)

### Importing from google fonts or something similar

- Consider using preloading to prioritize loading fonts and improve performance `<link rel="preload” href=”…”>`
- Consider using preconnect to establish early connections to important third-party origins and improve performance `<link rel="preconnect” href=”…”>`
- It's best to import them into HTML which is loaded earlier and doesn't block loading of other resources

## Media queries

Used to apply CSS conditionally. Mostly based on screen width

### Practices

- Don't target devices, add breakpoints when the design breaks
- Don't change HTML directly use CSS

Common screen sizes
320px—480px - mobiles devices
481px—768px - ipad, tables, some mobile screens
769px—1024px - small screens, laptops, large tablets
1025px—1200px - desktops

Mobile first media queries use `min-width` while desktop first use `max-width`. This means if you go mobile first, you style an element or everything for mobile without using mobile queries and then add them for layout on different width breakpoints.

```css
@media print {

}
```

Hides everything for print.

### Modals

For modals use tabindex to switch focus on the modal for keyboard navigation
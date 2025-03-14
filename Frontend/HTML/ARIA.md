# ARIA

Accessibility rich internet applications. This file will contain all encountered ARIA uses.

## `aria-expanded` attribute

It's a dynamic aria state attribute, which tells whether a component is expanded or not and is put on the container. It was encountered on a button component, which expands additional content.

```tsx
<article className={styles.teamMember}>
  {/* HTML TASK 4 - One aria attribute is missing here. Find it and add it. */}
  <h3>
    <button
      aria-expanded={isExpanded}
      className={styles.button}
      onClick={toggleExpanded}
    >
      <span className={styles.buttonTeamMember}>
        <TeamMemberIcon />
        <span className={styles.buttonText}>
          <strong className={styles.text}>John Doe</strong>
          <span className={styles.text}>Junior Front-End Engineer</span>
        </span>
      </span>
      {isExpanded ? <Minus /> : <Plus />}
    </button>
  </h3>
  {isExpanded && (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada
        lacus quis diam accumsan pharetra. Sed accumsan sit amet nisl at
        tincidunt. Quisque efficitur tristique lorem nec dictum. Suspendisse
        posuere, purus ac fermentum venenatis, urna nibh viverra metus, vel
        tincidunt augue lacus vel lectus.
      </p>
    </div>
  )}
</article>
```

## `aria-label` attribute

### Label an icon link

```tsx
<a
  aria-label="Twitter"
  href="https://twitter.com"
  target="_blank"
  rel="noreferrer"
>
  <Twitter />
</a>
```

## `aria-labelledby` attribute

Let's say some input or anything has multiple labels. `aria-labelledby` attributes let's us defined what tags label it.

```tsx
<div className={styles.field}>
  <label className={styles.label} htmlFor="fullName">
    Full Name
  </label>
  <span className={styles.hidden} id="fullNameDescription">
    (First and Last Name)
  </span>
  {/* Accessibility TASK 1: Make the "Full Name" input to have an accessible label as "Full Name (First and Last Name)"; Do not change the UI */}
  <input
    className={styles.input}
    id="fullName"
    name="fullName"
    type="text"
    required
    aria-labelledby="fullName fullNameDescription"
  />
</div>
```

## `role` attribute

Describes a role for an element

### Role `alert`

Input had a informational message, that informed user when a form was submitted. It had a `role='alert'` attribute

````tsx
<p role="alert">Form successfully submitted</p>
```
````

### Role `region`

The region role is used to identify document areas the author deems significant. 

## `tabIndex` attribute

Can be used specify the order in which the elements get focused (tabbed). Especially useful for modals.

If it's really necessary you are recommended to only use 0 and -1 as tabindex values.

## `aria-controls` attribute

Specifies which element is being controlled, it could be a button controls whether an element is shown

```html
<h3>
  <button
    type="button"
    aria-expanded="false"
    class="accordion-trigger"
    aria-controls="sect3"
    id="accordion3id"
  >
    <span class="accordion-title">
      Shipping Address
      <span class="accordion-icon"></span>
    </span>
  </button>
</h3>
<div
  id="sect3"
  role="region"
  aria-labelledby="accordion3id"
  class="accordion-panel"
  hidden=""
>
  <div>
    <fieldset>
      <p>
        <label for="m-add1">Address 1:</label>
        <input type="text" name="m-add1" id="m-add1" />
      </p>
      <p>
        <label for="m-add2">Address 2:</label>
        <input type="text" name="m-add2" id="m-add2" />
      </p>
      <p>
        <label for="m-city">City:</label>
        <input type="text" name="m-city" id="m-city" />
      </p>
      <p>
        <label for="m-state">State:</label>
        <input type="text" name="m-state" id="m-state" />
      </p>
      <p>
        <label for="m-zip">Zip Code:</label>
        <input type="text" name="m-zip" id="m-zip" />
      </p>
    </fieldset>
  </div>
</div>
```

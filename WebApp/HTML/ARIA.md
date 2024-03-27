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

## `role` attribute

Describes a role for an element

### Role `alert`

Input had a informational message, that informed user when a form was submitted. It had a `role='alert'` attribute

````tsx
<p role="alert">Form successfully submitted</p>
```
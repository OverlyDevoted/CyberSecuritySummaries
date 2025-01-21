## Debugging

So usually accessibility is left behind and it's something you have to fix later down the line. It's important to know what to do and how to find issues related to accessibility 

1. Navigate using keyboard navigation. 

A good indicator to whether a site is suited for accessibility is to try and navigate through it using keyboard navigation

2. Open browser extensions like Axe

Run the extension for each page state (modals and context menus and such). Prioritize accessibility violations over best practices.

3. Zoom the page to at least 200%

Check if layouts reflow, does horizontal scrolling appear, basically check if everything is still operable.

4. Check different visual modes

Test light and dark modes. Windows high contrast mode can be useful.

Make sure animation and motion can be turned off

5. Run screen reader VoiceOver or NVDA 

https://web-accessibility-v3.vercel.app/topics/screen-readers/how-to-enable

Check for issues carefully, some things might be operator errors.

6. Gather missing transcripts or captions

Make note of any missing transcripts, captions (audio, video), alternate content (images)

Ensure media players can accommodate that content.

## Tools

Some tools were covered but to have a sectioned part. 

axe DevTools
Accessibility Insights for Web
Accessibility tab in DevTools can help to go through computed properties and provides an accessibility tree.

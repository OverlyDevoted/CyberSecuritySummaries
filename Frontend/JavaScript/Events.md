# Input events

## Mouse events

| Name | Description | 
| - | - |
| click | Regular click on element |
| dblclick | Quick on double-click event |
| mouseover | Calls callback when mouse enters the element or any of it's descendants |
| mouseout | Calls callback when mouse leaves the element or any of it's descendants |
| mouseenter | Calls callback function on itself when mouse enters the bounding box of the element |
| mouseleave | Calls callback function on itself when mouse leaves the bounding box of the element |
| mousedown | Callback function is called when the user clicks on the element. Contrary to `click` event, the callback is immediately called after a click, not after release |
| mouseup | Callback function is called when a clicked mouse is released on the element. Difference between `click` and `mouseup` is that for the `click` event to be called user needs to click and release the mouse inside the bounding box of the element, while before `mouseup` callback, mouse can be clicked anywhere in the DOM, the event only is called when mouse is released at the element with the `mouseup` event listener |
| mousemove | Callback is called every time when mouse is **moved** inside the element |
| contextmenu | Is called when user tries to right-click an element. Usually then a context menu opens up. You can effectively disable that feature by calling `e.preventDefault()` |
| mousewheel and DOMMouseScroll |  |

## Pointer events

These are events for better compatibility between different devices. Many of these are analogous to the `mouse<action>` events. 

- pointerdown
- pointerup
- pointermove
- pointerenter
- pointerleave
- pointerover
- pointerout
- pointercancel

Pointer events have some useful properties that can be used to create more sophisticated user actions.

| Property | Description |
| - | - |
| `pointerId` | Unique pointer id, which activated the event |
| `pointerType` | String containing the type of device, that triggered the event |
| `clientX` and `clientY` | Gives pixel coordinate location in the viewport for the pointer |
| `pageX` and `pageY` | pointer X, Y coordinates regarding the document  |
| `target` | Target DOM element |
| `pressure` | Pointer press strength from 0 to 1 |
| `tiltX` and `tiltY` | Pointer angle in degrees. Only for compatible devices |
| `twist` | ? |
| `width` and `height` | Pointer contact width and height. |
| `isPrimary` | Returns a boolean for whether the pointer is the main pointer for this event. For `touch` events, usually the first touch will become the primary touch. |

`screenX`,`screenY` gets the cursor position vector relative to the top-left screen corner.
`clientX`, `clientY` gets the cursor position vector relative to the top-left browser viewport corner 

## Keyboard events

Main keyboard events:

- `keydown` - is used to determine what button was pressed. And continues to fire when the button is held.
- `keypress` - is used to determine what symbol the button produces and is only called once. Does not get called for buttons that do not produce a symbol
- `keyup` - is used to determine what button was released.

### Keyboard event properties

| Property | Description |
| - | - |
| `key` | Returns button symbol or name that caused the event |
| `keyCode` | Returns button unicode |
| `code` | Returns button name |
| `shiftKey` | returns whether shift key was down during key event |
| `ctrlKey` | Like `shiftKey` |
| `altKey` | Like `shiftKey` |
| `metaKey` | Like `shiftKey`, but for `Windows`,`CMD` buttons |

## Scroll-wheel events
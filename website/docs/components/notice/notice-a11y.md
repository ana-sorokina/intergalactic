---
title: Notice
a11y: AA
tabs: Design('notice'), A11y('notice-a11y'), API('notice-api'), Example('notice-code'), Changelog('notice-changelog')
---

## What component has

### Keyboard support

See detailed information about the keyboard support for the all clickable elements in the [Keyboard control guide](/core-principles/a11y/a11y-keyboard).

### Roles & attributes

The list below describes roles and attributes that component already has.

Table: Roles & attributes

| Component      | Attribute                          | Usage                                                                                                                                                                                                                               |
| -------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Notice`       | `role="region"`                    | Defines an ARIA landmark and allows users to navigate to the component easily and to have it listed in a summary of the page. |
| `Notice`       | `aria-label`                       | Defines a default accessible name for the region: `"Notification"` for **info**, **success** and **warning** themes, and `"Critical notification"` for **danger** theme. |
| `Notice`       | `aria-live="polite"`               | Defines a region which receives updates that are important for the user to receive, but not so rapid as to be annoying. The screen reader will speak changes whenever the user is idle.                    |
| `Notice`       | `aria-live="assertive"` (only for `warning` and `danger` themes) | Tells assistive technologies to interrupt other processes to provide users with immediate notification of container changes. |
| `Notice.Close` | `aria-label="Close notification"`  | Defines the default accessible name for the **Close** button. |

## Considerations for developers

- Elements with the `aria-live` attribute are automatically announced only when their content changes. So, if you want your notice to be announced automatically, you should initially create an empty element and then update its content.
- Avoid showing more than one `Notice` on the same page at once. If you absolutely have to do it (especially if they have the same `theme`), make sure they all have different accessible names so they can be easily distinguished when navigating the landmarks.

## Other recommendations

See more accessibility recommendations in the common [Accessibility guide](/core-principles/a11y/a11y).

```js script
import { html } from '@open-wc/demoing-storybook';
import { withKnobs, withWebComponentsKnobs } from '@open-wc/demoing-storybook';
import { ProfilesUsernameModule } from '../dist';
import { setupApolloClientMock } from '../test/mocks';

setupApolloClientMock().then(client =>
  new ProfilesUsernameModule({ apolloClient: client }).install()
);

export default {
  title: 'HpuSetUsername',
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: {
    component: 'hpu-set-username',
    options: { selectedPanel: 'storybookjs/knobs/panel' },
  },
};
```

# `<hpu-set-username>`

Small form to set the username for your holochain application.

## Features

- Checks that the username is longer than a given minimum length
- Sets the username for the user entering the application
- Setting the username fails if the username was already created by another agent

## API

<sb-props of="hpu-set-username"></sb-props>

### Installation & Usage

Please note that this custom element needs to be installed together with all the other elements of the `ProfilesUsernameModule`. Go to [https://github.com/holochain-open-dev/calendar-events-module](https://github.com/holochain-open-dev/calendar-events-module) for installation instructions.

After having installed the `CalendarEventsModule`, just add the element to your html:

```html
<body>
  <hod-create-calendar-event></hod-create-calendar-event>
</body>
```

### Variants

```js preview-story
export const Default = () =>
  html`
    <div style="height: 200px; width: 300px; padding: 16px;">
      <hod-create-calendar-event></hod-create-calendar-event>
    </div>
  `;
```

```js preview-story
export const InitialEventProperties = () => {
  const startTime = Math.floor(Date.now() / 1000);
  const endTime = Math.floor(Date.now() / 1000) + 3600;
  return html`
    <div style="height: 200px; width: 300px; padding: 16px;">
      <hod-create-calendar-event
        .initialEventProperties=${{ startTime, endTime }}
      ></hod-create-calendar-event>
    </div>
  `;
};
```

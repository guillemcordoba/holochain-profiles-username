# holochain-profiles-username module

Small UI module to set and retrieve usernames. This is one of the possible UI module counterparty to the [profiles-zome](https://github.com/holochain-open-dev/profiles-module).

This module is designed to be included in SPAs, assuming as little as possible from those. It is packaged as an npm package that offers native Custom Elements that can be used across browsers and frameworks.

## Documentation

See our [`storybook`](https://guillemcordoba.github.io/holochain-profiles-username).

## Assumptions

These are the things you need to know to decide if you can use this module in your happ:

- `ApolloClient` as the state-management and data-fetching engine.
- The resolvers are declared in the frontend using [`makeExecutableSchema`](https://www.npmjs.com/package/@graphql-tools/schema).
- No framework or library assumed.

## Installation and usage

1. Add the module into the dependencies of your `package.json` with `holochain-profiles-username: "guillemcordoba/holochain-profiles-username`. Run `npm install`.
2. Add the GraphQl schema and resolvers to your `ApolloClient` setup:

```js
import { AppWebsocket } from "@holochain/conductor-api";
import {
  profilesUsernameTypeDefs,
  profilesUsernameResolvers,
} from "holochain-profiles-username";

export async function setupClient(url) {
  const appWebsocket = await AppWebsocket.connect(String(url));

  const appInfo = await appWebsocket.appInfo({ app_id: "test-app" });

  const cellId = appInfo.cell_data[0][0];

  const executableSchema = makeExecutableSchema({
    typeDefs: [rootTypeDef, profilesUsernameTypeDefs],
    resolvers: [profilesUsernameResolvers(appWebsocket, cellId)],
  });

  const schemaLink = new SchemaLink({ schema: executableSchema });

  return new ApolloClient({
    typeDefs: allTypeDefs,
    cache: new InMemoryCache(),
    link: schemaLink,
  });
}
```

3. In the root file of your application, install the module:

```js
import { ProfilesUsernameModule } from "holochain-profiles-username";
async function initApp() {
  const client = await setupClient(`ws://localhost:8888`);

  const calendarEventsModule = new ProfilesUsernameModule(client);

  await calendarEventsModule.install();
}
```

4. Once you have installed the module, all the elements you see in our storybook will become available for you to use in your HTML, like this:

```html
...
<body>
  <hpu-set-username></hpu-set-username>
</body>
```

Take into account that at this point the elements already expect a holochain conductor running at `ws://localhost:8888`.

## Developer setup

Read the [UI developer setup](/dev-setup.md).

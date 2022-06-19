## Environment Variables

Environment variables are consumed with "@env" module as follows:

```js
import { ENV_NAME } from "@env";
```

For any new environment variable, add them to the local .env file, and add the variable name to `src/types/env.d.ts` in order to get TypeScript autocomplete.

```ts
// src/types/env.d.ts
declare module "@env" {
  export const API_BASE_URL: string;
  // ...rest of envs
  export const NEW_ENV_NAME: string;
}
```

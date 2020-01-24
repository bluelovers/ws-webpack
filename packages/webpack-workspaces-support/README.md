# README.md

    tweak webpack config with yarn workspaces

## install

```bash
yarn add webpack-workspaces-support
yarn-tool add webpack-workspaces-support
npm install webpack-workspaces-support
```

## Usage


### Next.js

Create a `next.config.js` in your project

```ts
// next.config.js
const withWorkspacesSupport = require('webpack-workspaces-support/nextjs')
module.exports = withWorkspacesSupport({
  /* config options here */
})
```

### Nuxt.js

```ts
import withWorkspacesSupport from 'webpack-workspaces-support'

export default {
  build: {
    extend (config, { isDev, isClient }) {
      
      withWorkspacesSupport(config, { isDev, isClient })
      
    }
  }
}
```

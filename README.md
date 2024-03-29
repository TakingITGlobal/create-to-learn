## 👉 Get Started

### 1. Setup local engines

- Node >= v18.15.0
- NPM >= v9.5.0

[Node Version Manager](https://github.com/nvm-sh/nvm) (`nvm`) is recommended for managing multiple versions of Node, including the latest stable.

```
nvm install --lts
nvm use --lts
```

### 2. Install dependencies

```
npm install
```

### 3. Add environment config

Update your `.env` file with values for each environment variable. This file should be provided to you securely through Bitwarden.

```
API_KEY=AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas
etc ...
```

### 4. Run local development

```
npm start
```

When the above command completes you'll be able to view your website at `http://localhost:8888`

_Note: You can run just the front-end with `npm run start:react`, but `npm start` also handles running your API endpoints (located in the `/api` directory)._

## Testing

Tests in this codebase render using [React Testing Library](https://testing-library.com/docs/) on Jest. We're also using [axe-core (via `jest-axe`)](https://www.npmjs.com/package/jest-axe) for basic accessibility testing.

To start the test suite, run:

```
npm run test
```

The suite will automatically run in watch mode.

## 🥞 Stack

This project uses the following libraries and services:

- Framework - [Create React App](https://create-react-app.dev) with React Router
- UI Kit - [Material UI](https://material-ui.com)
- Authentication - [Auth0](https://auth0.com)
- Database - [Cloud Firestore](https://firebase.google.com/products/firestore)
- Newsletter - [Mailchimp](https://mailchimp.com)
- Contact Form - [Airtable](https://airtable.com)
- Analytics - [Google Analytics](https://googleanalytics.com)
- Hosting - [Netlify](https://netlify.com)

## 📚 Guide

<details>
<summary><b>Routing</b></summary>
<p>
  This project uses <a target="_blank" href="https://reacttraining.com/react-router/web/guides/quick-start">React Router</a> and includes a convenient <code>useRouter</code> hook (located in <code><a href="src/util/router.js">src/util/router.js</a></code>) that wraps React Router and gives all the route methods and data you need.

```js
import { Link, useRouter } from './../util/router.js'

function MyComponent() {
  // Get the router object
  const router = useRouter()

  // Get value from query string (?postId=123) or route param (/:postId)
  console.log(router.query.postId)

  // Get current pathname
  console.log(router.pathname)

  // Navigate with the <Link> component or with router.push()
  return (
    <div>
      <Link to="/about">About</Link>
      <button onClick={(e) => router.push('/about')}>About</button>
    </div>
  )
}
```

</p>
</details>

<details>
<summary><b>Authentication</b></summary>
<p>
  This project uses <a href="https://auth0.com">Auth0</a> and includes a convenient <code>useAuth</code> hook (located in <code><a href="src/util/auth.js">src/util/auth.js</a></code>) that wraps Auth0 and gives you common authentication methods. Depending on your needs you may want to edit this file and expose more Auth0 functionality.

```js
import { useAuth } from './../util/auth.js'

function MyComponent() {
  // Get the auth object in any component
  const auth = useAuth()

  // Depending on auth state show signin or signout button
  // auth.user will either be an object, null when loading, or false if signed out
  return (
    <div>
      {auth.user ? (
        <button onClick={(e) => auth.signout()}>Signout</button>
      ) : (
        <button onClick={(e) => auth.signin('hello@divjoy.com', 'yolo')}>
          Signin
        </button>
      )}
    </div>
  )
}
```

</p>
</details>

<details>
<summary><b>Database</b></summary>
<p>
  This project uses <a href="https://firebase.google.com/products/firestore">Cloud Firestore</a> and includes some data fetching hooks to get you started (located in <code><a href="src/util/db.js">src/util/db.js</a></code>). You'll want to edit that file and add any additional query hooks you need for your project.

```js
import { useAuth } from './../util/auth.js';
import { useItemsByOwner } from './../util/db.js';
import ItemsList from './ItemsList.js';

function ItemsPage(){
  const auth = useAuth();

  // Fetch items by owner
  // Returned status value will be "idle" if we're waiting on
  // the uid value or "loading" if the query is executing.
  const uid = auth.user ? auth.user.uid : undefined;
  const { data: items, status } = useItemsByOwner(uid);

  // Once we have items data render ItemsList component
  return (
    <div>
      {(status === "idle" || status === "loading") ? (
        <span>One moment please</span>
      ) : (
        <ItemsList data={items}>
      )}
    </div>
  );
}
```

</p>
</details>

<details>
<summary><b>Deployment</b></summary>
<p>
Install the Netlify CLI

```
npm install netlify-cli -g
```

Link codebase to a Netlify project (choose the "create and deploy manually" option)

```
netlify init
```

Add each variable from your `.env` file to your Netlify project, including ones prefixed with "REACT_APP\_". You can also use the Netlify UI for this by going to your Site settings → Build & Deploy → Environment.

```
netlify env:set VARIABLE_NAME value
```

Build for production

```
npm run build
```

Then run this command to deploy to Netlify

```
netlify deploy
```

See the <a target="_blank" href="https://docs.netlify.com/cli/get-started/#manual-deploys">Netlify docs</a> for more details.

</p>
</details>

<details>
<summary><b>Other</b></summary>
<p>
  This project was created using <a href="https://divjoy.com?ref=readme_other">Divjoy</a>, the React codebase generator. You can find more info in the <a href="https://docs.divjoy.com">Divjoy Docs</a>.
</p>
</details>

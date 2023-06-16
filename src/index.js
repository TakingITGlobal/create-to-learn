import React from 'react'
import ReactDom from 'react-dom'
import App from './pages/_app'
import * as serviceWorker from './serviceWorker'
import './i18n'

ReactDom.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()

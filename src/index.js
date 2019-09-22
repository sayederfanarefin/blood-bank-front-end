import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: "https://785b857639654478b7a6cae425f9ee44@sentry.io/1398393"
    });
}

ReactGA.initialize('UA-134041084-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

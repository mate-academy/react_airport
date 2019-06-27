import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const urlFlight = 'https://api.iev.aero/api/flights/'

ReactDOM.render(<App urlFlight={urlFlight} />, document.getElementById('root'));
serviceWorker.unregister();

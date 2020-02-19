import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceApp from './app/main/ConferenceApp';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import registerServiceWorker from './registerServiceWorker';
import tr from "robe-react-ui/lib/assets/tr_TR.json";
import Application from "robe-react-ui/lib/Application";


ReactDOM.render(<Application language={tr}><ConferenceApp /></Application>, document.getElementById('root'));
registerServiceWorker();

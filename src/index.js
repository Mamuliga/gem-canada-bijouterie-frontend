import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './assets/locale';

import App from './App';
import 'font-awesome/css/font-awesome.css';
import './assets/styles/styles.scss';
import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react';

const Root = () => (
  <Router>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Router>
);

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

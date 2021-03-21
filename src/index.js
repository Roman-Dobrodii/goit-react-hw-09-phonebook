import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import './index.css';
import AppNew from './components/app/AppNew';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppNew />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </div>,

  document.getElementById('root'),
);

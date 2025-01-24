import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './admin/app/store'
import { Provider } from 'react-redux'

import SuspenseContent from './admin/containers/SuspenseContent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Suspense fallback={<SuspenseContent />}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </Suspense> */}
  </React.StrictMode>
);

reportWebVitals();

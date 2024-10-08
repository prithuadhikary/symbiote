import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';
import './util/i18n';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const customTheme = {
  button: {
    color: {
      primary: "bg-indigo-500 hover:bg-indigo-600 text-white"
    },
  },
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Flowbite theme={{ theme: customTheme }}>
          <App />
        </Flowbite>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

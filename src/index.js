import React from 'react';
import ReactDOM from 'react-dom/client';
import "./components/basic/Global.css";
import { AuthProvider } from "./context/AuthProvider";

import App from './App';

const root = ReactDOM.createRoot(document.body);
root.render(
  //<React.StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  //</React.StrictMode>
);

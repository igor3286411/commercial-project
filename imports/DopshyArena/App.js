import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store/store.ts';
import Layouts from './layouts/Layouts.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import {ThemeProvider, ToasterProvider, ToasterComponent} from "@gravity-ui/uikit";

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme="light">
      <ToasterProvider>
        <Layouts/>
        <ToasterComponent/>
      </ToasterProvider>
    </ThemeProvider>
  </Provider>
);

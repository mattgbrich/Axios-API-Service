import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import Foods from './Foods'
import Actions from './Actions'
import Notifications from './Notifications'

function App() {
  return (
    <Provider store={store}>
      <Foods />
      <Actions />
      <Notifications />
    </Provider>
  );
}

export default App;

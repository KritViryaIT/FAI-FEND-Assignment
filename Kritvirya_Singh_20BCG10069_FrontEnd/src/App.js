// App.js
import React from 'react';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Import the updated store
import RoleSelector from './components/RoleSelector';
import AddFields from './components/AddFields';
import DisplayFields from './components/DisplayFields';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <RoleSelector />
        <AddFields />
        <DisplayFields />
      </div>
    </Provider>
  );
}

export default App;

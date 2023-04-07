import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import Home from './pages/Home';
// import List from './pages/List';
import Home from '@/pages/Home';
import List from '@/pages/List';
import Provider from '@/context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/list" component={ List } />
      </Switch>
    </Provider>
  );
}

export default App;

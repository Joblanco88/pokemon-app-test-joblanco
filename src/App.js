import { Route, Switch } from 'react-router';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';

function App() {
  return (
    <Switch>
      <Route exact path="/" componenent={ Home } />
      <Route exact path="/list" componenent={ List } />
    </Switch>
  );
}

export default App;

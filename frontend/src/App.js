import './App.scss'
import React from 'react';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'  
import Home from './routes/Home'
import Route2 from './routes/Route2'
import Route3 from './routes/Route3'

function App() {
  return (
    <Router>
      <Sidebar/>
      <Switch>

        <Route path='/' exact component={Home} />
        <Route path='/route2' component={Route2} />
        <Route path='/route3' component={Route3} />

      </Switch>
    </Router>
  );
}

export default App;

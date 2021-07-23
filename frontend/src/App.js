import './App.scss'
import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'  
import Home from './routes/Home'
import Route3 from './routes/Route3'
import Feed from "./components/Feed/Feed"

function App() {
  return (
    <Router>
      <Sidebar/>
      <Switch>

        <Route path='/' exact component={Home} />
        <Route path='/feed' component={Feed} />
        <Route path='/route3' component={Route3} />

      </Switch>
    </Router>
  );
}

export default App;

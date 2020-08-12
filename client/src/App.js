import React from 'react';
import './App.css';
import { Router, Redirect } from '@reach/router';

import List from './views/List';
import New from './views/New';
import Status from './views/Status';
import CustomTabs from './components/CustomTabs';

function App() {

  return (
    <div className="App">
      <CustomTabs headers={['Manage Players', 'Manage Player Status']} paths={['/players', '/status']} initialIdx={0} selectColor="secondary" textColor="secondary"/>
      <Router>
        <Redirect from="/" to="/players/list" noThrow/>
        <Redirect from="/players" to="/players/list" noThrow/>
        <Redirect from="/status" to="/status/game/1" noThrow/>
        <List path="players/list"/>
        <New path="players/addplayer"/>
        <Status path="status/game/:gameId"/>
      </Router>    
    </div>
  );
}

export default App;

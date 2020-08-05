import React from 'react';
import NavTask from '../src/components/NavTask';
import TaskList from '../src/components/TaskList';
import Footer from '../src/components/Footer';

import './App.css'
import 'bulma/css/bulma.css'

function App() {
  return (
    <>
      < NavTask />
      < TaskList />
      < Footer />
    </>
  );
}

export default App;

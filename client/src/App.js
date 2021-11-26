import './App.css';
import Home from './Components/Home';
import Add from './Components/Adds';
import { Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Route exact path='/add' component={Add}  />
      <Route exact path='/'    component={Home} />
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import LandingPage from './components/landing/LandingPage';
import Home from './components/home/HomePage';
import DogDetail from './components/detail/DogDetail';
import CreateDog from './components/createDog/Create';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/home/:id" component={DogDetail}/>
      <Route exact path="/create" component={CreateDog} />
    </div>
    </BrowserRouter>
  );
}

export default App;

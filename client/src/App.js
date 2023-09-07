import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

export const config = {
  endpoint: "http://localhost:8080/v1",
};

function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route exact path="/" element={ <Home /> } />

        </Routes>
      </Router>
    </>
  );
}

export default App;
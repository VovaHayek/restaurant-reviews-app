import './App.css';
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RestaurantsListPage from './pages/RestaurantsListPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import Authorization from './pages/Authorization';
import Header from './components/Header';
import Logout from './components/Logout';

function App() {

  useEffect(() => {
    
  });

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path='/' Component={RestaurantsListPage} />
          <Route path='restaurant/:restaurantName' Component={RestaurantDetailPage} />
          <Route path='authorization/' Component={Authorization} />
          <Route exact path='logout/' Component={Logout} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

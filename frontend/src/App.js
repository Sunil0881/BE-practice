import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Crud from './components/CRUD';

function App() {
 

  return (
    <div>
       <Router>
            <Routes>
              <Route path="/" element={<Crud />} />
              
             
            </Routes>
          </Router>
     
    </div>
  );
}

export default App;

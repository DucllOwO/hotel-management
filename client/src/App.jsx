import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import Staff from "./pages/Staff/Staff";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Admin/>} />
            <Route path="admin" element={<Staff/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;

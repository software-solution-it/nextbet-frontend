import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './modules/home/HomePage';


const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);

export default AppRoutes;

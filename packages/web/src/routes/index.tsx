import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
};

export default MyRoutes;
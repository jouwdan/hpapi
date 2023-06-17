import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import { Navbar } from '../components/Navbar';

const MyRoutes = () => {
  return (
    <>
      <Navbar currentPath="/" />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes here */}
        </Routes>
      </Router>
    </>
  );
};

export default MyRoutes;
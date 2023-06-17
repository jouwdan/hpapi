import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import NotFound from './NotFound';
import { Navbar } from '../components/Navbar';

const MyRoutes = () => {
  return (
    <>
      <Navbar>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes here */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Navbar>
    </>
  );
};

export default MyRoutes;
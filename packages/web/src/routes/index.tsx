import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Navbar } from '../components/Navbar';

import Home from './home';
import Characters from './characters';
import NotFound from './NotFound';

const MyRoutes = () => {
  return (
    <>
      <Navbar>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            {/* Add more routes here */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Navbar>
    </>
  );
};

export default MyRoutes;
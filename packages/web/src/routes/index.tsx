import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Navbar } from '../components/Navbar';

import Home from './home';
import Characters from './characters';
import Character from './characters/character';
import NotFound from './NotFound';
import Spells from './spells';

const MyRoutes = () => {
  return (
    <>
      <Navbar>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<Character />} />
            <Route path="/spells" element={<Spells />} />
            {/* Add more routes here */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Navbar>
    </>
  );
};

export default MyRoutes;
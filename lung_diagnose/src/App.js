import {
  Route,
  Routes
} from "react-router-dom";
import { Home, Pricing, Services } from './pages'


const App = () => {
  return (
    <div className="m-[100px]">
      <Routes>
        <Route exact index element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/pricing" element={<Pricing />} />
      </Routes>
    </div>
  );
}

export default App;

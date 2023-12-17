import {
  Route,
  Routes
} from "react-router-dom";
import { Home, Services } from './pages'


const App = () => {
  return (
    <div className="m-[100px]">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </div>
  );
}

export default App;

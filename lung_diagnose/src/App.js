import {
  Route,
  Routes
} from "react-router-dom";
import { Home } from './pages'

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;

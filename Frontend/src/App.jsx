import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./assets/Pages/HomePage";
import DestinationPage from "./assets/Pages/DestinationPage";
import Compare from "./assets/Pages/Compare";
import NotFound from "./assets/Pages/NotFound"

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/destination/:id" element={<DestinationPage />} />
    <Route path="/compare" element={<Compare />} />
    <Route path="/*" element={<NotFound />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App

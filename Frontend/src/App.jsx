import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react";
import HomePage from "./assets/Pages/HomePage";
import DestinationPage from "./assets/Pages/DestinationPage";
import Compare from "./assets/Pages/Compare";
import NotFound from "./assets/Pages/NotFound"

function App() {

   const [selectedIds, setSelectedIds] = useState([]);

    function toggleSelect(id) {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    }
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<HomePage toggleSelect={toggleSelect} selectedIds={selectedIds}/>} />
    <Route path="/destination/:id" element={<DestinationPage  selectedIds={selectedIds} toggleSelect={toggleSelect} />} />
    <Route path="/compare" element={<Compare  selectedIds={selectedIds}/>} />
    <Route path="/*" element={<NotFound />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App

import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react";
import HomePage from "./assets/Pages/HomePage";
import DestinationPage from "./assets/Pages/DestinationPage";
import Compare from "./assets/Pages/Compare";
import NotFound from "./assets/Pages/NotFound"
import Favorites from "./assets/Pages/Favorites";

function App() {

   const [selectedIds, setSelectedIds] = useState([]);
   const [favoriteIds, setFavoriteIds] = useState([]);

    function toggleSelect(id) {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    }

     function toggleFavorite(id) {
        if (favoriteIds.includes(id)) {
            setFavoriteIds(favoriteIds.filter(favoriteId => favoriteId !== id));
        } else {
            setFavoriteIds([...favoriteIds, id]);
        }
    }
   

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<HomePage toggleSelect={toggleSelect} selectedIds={selectedIds} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite}/>} />
    <Route path="/destination/:id" element={<DestinationPage  selectedIds={selectedIds} toggleSelect={toggleSelect} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite}/>} />
    <Route path="/compare" element={<Compare  selectedIds={selectedIds} toggleSelect={toggleSelect} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite}/>} />
    <Route path="/favorites" element={<Favorites  favoriteIds={favoriteIds} toggleFavorite={toggleFavorite}/>} />
    <Route path="/*" element={<NotFound />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App

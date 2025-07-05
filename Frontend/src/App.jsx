import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import HomePage from "./assets/Pages/HomePage";
import DestinationPage from "./assets/Pages/DestinationPage";
import Compare from "./assets/Pages/Compare";
import NotFound from "./assets/Pages/NotFound"
import Favorites from "./assets/Pages/Favorites";
import NavBar from "./assets/Components/NavBar";
import FavoritesSidebar from "./assets/Components/FavoritesSidebar";
import UseStorage from "./assets/hooks/UseStorage.js";

function App() {

    const [destinations, setDestinations] = useState([])
   const [selectedIds, setSelectedIds] = UseStorage("selectedIds" ,[]);
   const [favoriteIds, setFavoriteIds] = UseStorage('favoriteIds', []);
   const [searchQuery, setSearchQuery] = useState("");
   const [showSidebar, setShowSidebar] = useState(false)

   const previousLength = useRef(favoriteIds.length);

useEffect(() => {
  async function fetchDestinations() {
    try {
      const res = await fetch('http://localhost:3001/destinations');
      if (!res.ok) throw new Error('Fetch error');
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      console.error(error);
    }
  }
  fetchDestinations();
}, []);



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

    useEffect(() => {
    if(favoriteIds.length > previousLength.current){
        setShowSidebar(true)
    }
    previousLength.current = favoriteIds.length;
    }, [favoriteIds])
   

  return (
   <BrowserRouter>
   <NavBar favoriteIds={favoriteIds} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
   <FavoritesSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} favoriteIds={favoriteIds} destinations={destinations}  toggleFavorite={toggleFavorite}/>
   <Routes>
    <Route path="/" element={<HomePage toggleSelect={toggleSelect} selectedIds={selectedIds} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} searchQuery={searchQuery} setSearchQuery={setSearchQuery} destinations={destinations}/>} />
    <Route path="/destination/:id" element={<DestinationPage  selectedIds={selectedIds} toggleSelect={toggleSelect} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} destinations={destinations}/>} />
    <Route path="/compare" element={<Compare  selectedIds={selectedIds} toggleSelect={toggleSelect} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} destinations={destinations}/>} />
    <Route path="/favorites" element={<Favorites  favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} destinations={destinations}/>} />
    <Route path="/*" element={<NotFound />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function DestinationPage({destinations, selectedIds, toggleSelect, favoriteIds, toggleFavorite}) {
    const {id} = useParams();
    const [destination, setDestination] = useState("")
    


     useEffect(() => {
    if (destinations.length > 0) {
      const singleDestination = destinations.find(d => d.id.toString() === id);
      setDestination(singleDestination);
    }
  }, [id, destinations]);
   

    
  if (!destination) {
    return <p>Caricamento in corso...</p>; 
  }

  const isSelected = selectedIds.includes(destination.id);
  

    return (
        <div className="destination-wrapper">
        <h1 className="destination-title">{destination.title}</h1>
        <img className="destination-img" src={destination.img} alt={destination.title} />
        <h4 className="destination-semi-title">Categoria: {destination.category}</h4>
        <div className="single-wrapper">
        <p className="destination-p"><strong>Paese:</strong> <span className="destination-span">{destination.country}</span></p>
        <p className="destination-p"><strong>Lingua Parlata:</strong> <span className="destination-span">{destination.language}</span></p>
        <p className="destination-p"><strong>Attività consigliate:</strong> <span className="destination-span">{destination.activities.join(", ")}</span></p>
        <p className="destination-p"><strong>Stagione consigliata:</strong> <span className="destination-span">{destination.recommendedSeason}</span></p>
        <p className="destination-p"><strong>Clima :</strong> <span className="destination-span">{destination.climate}</span></p>
        <p className="destination-p"><strong>Prezzo Medio :</strong> <span className="destination-span">{`${destination.averageCost}€`}</span></p> 
        
        </div>
        <div className="btn-wrapper">
         <button onClick={() => toggleSelect(destination.id)} className={isSelected ? "btn btn-click" : "btn"}>{selectedIds.includes(destination.id) ? "Rimuovi" : "Aggiungi al Comparatore"}</button>
         <Link to="/" className="btn">Torna alla Home</Link>
         <button className={`btn ${favoriteIds.includes(destination.id) ? 'btn-click' : ''}`}  onClick={() => toggleFavorite(destination.id)}>{favoriteIds.includes(destination.id) ? "Rimuovi dai Preferiti" : "Aggiungi ai Preferiti"}</button>
        </div>
        </div>
    )
}
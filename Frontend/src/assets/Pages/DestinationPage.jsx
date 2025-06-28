import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function DestinationPage() {
    const {id} = useParams();
    const [destination, setDestination] = useState("")
    


    useEffect(() => {
      async function fetchDestination() {
        try {
            const res = await fetch('http://localhost:3001/destinations')
            if (!res.ok) {
                throw new Error(`Errore nel fetch della destinazione: ${res.status} ${res.statusText}`)
            }
            const data = await res.json()
            //console.log("Dati ricevuti:", data);
            const singleDestination = data.find((d) => d.id.toString() === id) //messo toString pk lo useParams interpreta l'id come stringa... se no dovevo mettere il Number(id) all'id dello useParams
            setDestination(singleDestination)

        } catch (error) {
            console.error(error)
        }
    }
    fetchDestination()
    }, [id])
   

    
  if (!destination) {
    return <p>Caricamento in corso...</p>; 
  }
  

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
         <Link to="/compare" className="btn">Aggiungi al Comparatore</Link>
         <Link to="/" className="btn">Torna alla Home</Link>
        </div>
        </div>
    )
}
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


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
        <h2 className="destination-title">{destination.title}</h2>
        <img className="destination-img" src={destination.img} alt={destination.title} />
        <h5 className="destination-semi-title">Categoria: {destination.category}</h5>
        <div className="single-wrapper">

        <p className="destination-p">Attività consigliate: <span className="destination-span">{destination.activities}</span></p> <span className="destination-span">Stagione Consigliata: {destination.recommendedSeason}</span>
        <p className="destination-p">Lingua Parlata: {destination.language} <span className="destination-span">Paese: {destination.country}</span></p>
        </div>

        </div>
    )
}
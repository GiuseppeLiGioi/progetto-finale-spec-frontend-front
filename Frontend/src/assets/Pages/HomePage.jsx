import NavBar from "../Components/NavBar";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [destinations, setDestinations] = useState([])

    async function fetchDestinations() {
        try {
            const res = await fetch('http://localhost:3001/destinations')
            if (!res.ok) {
                throw new Error(`Errore nel fetch delle destinazioni: ${res.status} ${res.statusText}`)
            }
            const data = await res.json()
            //console.log("Dati ricevuti:", data);
            setDestinations(data)

        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        fetchDestinations()
    }, [])

    return (
        <div>

            <NavBar />
            {
                destinations && destinations.map((d) => (
                    <div key={d.id}>
                        <h3>{d.title}</h3>
                        <img src={d.img} alt={d.title} />
                        <div className="info-wrapper">
                            <span>{d.category}</span>
                            <span>{d.climate}</span>
                            <span>{d.averageCost}€</span>

                        </div>
                    </div>
                ))
            }
        </div>


    )
}
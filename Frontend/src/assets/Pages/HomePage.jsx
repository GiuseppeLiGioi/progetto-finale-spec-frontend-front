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
            console.log("Dati ricevuti:", data);
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
            <div className="container-dests">
            {
                destinations && destinations.map((d) => (

                    <div  className="container-single-dest" key={d.id}>
                        
                        <h3 className="dest-title" >{d.title}</h3>
                        <img  className="img-dest" src={d.img}alt={d.title} />
                        <div className="info-wrapper">
                            <span className="span-dest" >{d.category}</span>
                            <span className="span-dest" >{d.climate}</span>
                            <span className="span-dest" >{d.averageCost}€</span>

                        </div>
                    </div>




))
}
</div>
        </div>


    )
}
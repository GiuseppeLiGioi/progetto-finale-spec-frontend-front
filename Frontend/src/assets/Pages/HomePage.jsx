import NavBar from "../Components/NavBar";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [destinations, setDestinations] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

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

    
    const filteredDestinations = destinations.filter((d) => {
        return d.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    })
    

    return (
        <div>

            <NavBar searchQuery={searchQuery}  setSearchQuery={setSearchQuery}/>
            <div className="container-dests">
            {
                filteredDestinations && filteredDestinations.map((d) => (

                    <div  className="container-single-dest" key={d.id}>
                        
                        <h3 className="dest-title" >{d.title}</h3>
                        <img  className="img-dest" src={d.img}alt={d.title} />
                        <div className="info-wrapper">
                            <span className="span-dest" >{d.category}</span>
                        </div>
                    </div>




))
}
</div>
        </div>


    )
}
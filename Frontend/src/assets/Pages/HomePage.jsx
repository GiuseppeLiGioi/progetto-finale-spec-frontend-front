import NavBar from "../Components/NavBar";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [destinations, setDestinations] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("")

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

    const categoryDestinations = destinations.filter((d) => {
        if(categoryFilter === ""){
            return true
        }else{
            return d.category.toLowerCase().includes(categoryFilter.trim().toLowerCase())
        }
    })


    return (
        <div>

            <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="">Tutte le categorie</option>
                <option value="Città d'arte">Città d'arte</option>
                <option value="Metropoli">Metropoli</option>
                <option value="Avventura e natura">Avventura e natura</option>
                <option value="Mare e relax">Mare e relax</option>
            </select>
            <div className="container-dests">
                {
                    filteredDestinations && filteredDestinations.map((d) => (

                        <div className="container-single-dest" key={d.id}>

                            <h3 className="dest-title" >{d.title}</h3>
                            <img className="img-dest" src={d.img} alt={d.title} />
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
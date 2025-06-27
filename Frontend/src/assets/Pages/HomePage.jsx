import NavBar from "../Components/NavBar";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [destinations, setDestinations] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("")
    const [order, setOrder] = useState("")

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



    const filteredDestinations = destinations
        .filter((d) => {
            return d.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) &&
                (categoryFilter === "" || d.category.toLowerCase().includes(categoryFilter.trim().toLowerCase()))
                }) 
        .sort((a,b) => {
            if(order === "Crescente"){
                return a.title.localeCompare(b.title)
            }else if(order === "Decrescente"){
                return b.title.localeCompare(a.title)
            }
            return 0
               
        })


    return (
        <div>

            <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="select-wrapper">

                <select
                    className="select-home"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option className="option-select" value="">Tutte le categorie</option>
                    <option className="option-select" value="Città d'arte">Città d'arte</option>
                    <option className="option-select" value="Metropoli">Metropoli</option>
                    <option className="option-select" value="Avventura e natura">Avventura e natura</option>
                    <option className="option-select" value="Mare e relax">Mare e relax</option>
                </select>

                <select
                    className="select-home"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                >
                    <option className="option-select" value="">Non Ordinare</option>
                    <option className="option-select" value="Crescente">Crescente</option>
                    <option className="option-select" value="Decrescente">Decrescente</option>

                </select>
            </div>
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
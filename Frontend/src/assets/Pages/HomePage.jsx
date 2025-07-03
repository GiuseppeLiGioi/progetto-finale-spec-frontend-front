
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage({toggleSelect, selectedIds, toggleFavorite, favoriteIds, searchQuery}) {
    const [destinations, setDestinations] = useState([])
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
        .sort((a, b) => {
            if (order === "Crescente") {
                return a.title.localeCompare(b.title)
            } else if (order === "Decrescente") {
                return b.title.localeCompare(a.title)
            }
            return 0

        })


    return (
        <div>

            
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
                {filteredDestinations.map(d => {
                    const isSelected = selectedIds.includes(d.id);

                    return (
                        <div className="container-single-dest" key={d.id}>

                        <Link to={`/destination/${d.id}`}>
                            <h3 className="dest-title">{d.title}</h3>
                            <p className="p-dest">{d.category}</p>
                            <img className="img-dest" src={d.img} alt={d.title} />
                        </Link>
                        <div className="btn-wrapper">

                            <button
                                className={isSelected ? "btn-home btn-click" : "btn-home"}
                                onClick={() => {
                                    toggleSelect(d.id);
                                }}
                            >
                                {selectedIds.includes(d.id) ? "Rimuovi" : "Aggiungi al Comparatore"}
                            </button>
                        
                            <button className="btn-home" onClick={() => toggleFavorite(d.id)}>{favoriteIds.includes(d.id) ? "Rimuovi dai Preferiti" : "Aggiungi ai Preferiti"}</button>
                        </div>
                        </div>
                    )
                })}
            </div>

        </div >


    )
}
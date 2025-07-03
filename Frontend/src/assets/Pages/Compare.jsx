import { useState, useEffect } from "react"
export default function Compare({ selectedIds, toggleSelect, destinations }) {
const [selectedDestinations, setSelectedDestinations] = useState([])


  useEffect(() => {
    if (destinations.length > 0) {
      const filtered = destinations.filter(d => selectedIds.includes(d.id));
      setSelectedDestinations(filtered);
    }
  }, [selectedIds, destinations]);

    if(selectedDestinations.length === 0){
        return <p>Nessuna Destinazione Selezionata</p>
    }

    return (
       
        <div className="compare-wrapper">

            {

                selectedDestinations.map((s) => (
                    <div className="single-dest-compare" key={s.id}>
                        <h1 className="destination-title">{s.title}</h1>
                        <img className="destination-img" src={s.img} alt={s.title} />
                        <h4 className="destination-semi-title">Categoria: {s.category}</h4>
                        <div className="single-wrapper">
                            <p className="destination-p"><strong>Paese:</strong> <span className="destination-span">{s.country}</span></p>
                            <p className="destination-p"><strong>Lingua Parlata:</strong> <span className="destination-span">{s.language}</span></p>
                            <p className="destination-p"><strong>Attività consigliate:</strong> <span className="destination-span">{s.activities.join(", ")}</span></p>
                            <p className="destination-p"><strong>Stagione consigliata:</strong> <span className="destination-span">{s.recommendedSeason}</span></p>
                            <p className="destination-p"><strong>Clima :</strong> <span className="destination-span">{s.climate}</span></p>
                            <p className="destination-p"><strong>Prezzo Medio :</strong> <span className="destination-span">{`${s.averageCost}€`}</span></p>

                        </div>
                        <button onClick={() => toggleSelect(s.id)} className= "btn btn-click">Rimuovi Dal Comparatore</button>
                    </div>
                ))
            }

        </div>
        
        
    )
}
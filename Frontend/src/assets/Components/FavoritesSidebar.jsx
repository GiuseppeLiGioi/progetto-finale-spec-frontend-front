import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'


export default function FavoritesSidebar ({destinations, favoriteIds, showSidebar, setShowSidebar, toggleFavorite}){
    const [isOpen, setIsOpen] = useState(false)

const favoriteDest = destinations.filter((d) => favoriteIds.includes(d.id))


    return (
        <>
        {
            showSidebar && (
                <div className="sidebar-wrapper">
                    <button onClick={() => setShowSidebar(false)} className="btn-close">X</button>
                  {
                  favoriteDest.map((f) => (
                <div key={f.id} className="single-fav-sidebar">
                  <div className="info-side-wrapper">
                   <img src={f.img} alt={f.title} />
                   <h4>{f.title}</h4>
                  </div>
                  <div className="btn-fav-wrapper">
                   <Link className="btn-sidebar" to={`/destination/${f.id}`}><FontAwesomeIcon icon={faEye} /></Link>
                   <button className="btn-sidebar-remove" onClick={() => toggleFavorite(f.id)}><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                </div>
                  ))
                  }
                </div>
            )
        }
        </>
    )
}
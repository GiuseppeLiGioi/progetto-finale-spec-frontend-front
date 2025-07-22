import { Link } from "react-router-dom"
export default function NotFound() {
    return (
        <div className="notfound-container">
            <h2 className="not-found-text">OOPSSS... Qualcosa è andato storto.</h2>
           <Link to={'/'} className="not-found-btn" >Torna alla Home</Link>
        </div>
    )
}
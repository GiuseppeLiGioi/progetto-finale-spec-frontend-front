

export default function SearchBar({ searchQuery, setSearchQuery }){

    return (
        <input 
        type="text"
        placeholder="Inserisci il Titolo"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
    )
}
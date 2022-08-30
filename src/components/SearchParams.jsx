//import Select from 'react-select';
import {useContext, useEffect, useState} from 'react'
import ThemeContext from './ThemeContext';

function SearchParams({search, submit, filter, searchValue}) {
    const darktheme = useContext(ThemeContext); 
    //const[region, setRegion] = useState ([])


    const themeStyles = {
        backgroundColor: darktheme ? "hsl(207, 26%, 17%)" :  "hsl(0, 0%, 98%)",
        color: darktheme ? "hsl(0, 0%, 100%)" :  "hsl(200, 15%, 8%)",
        boxShadow: darktheme ? '0 4px 12px rgb(0 0 0 / 10%)' : '0 4px 12px rgb(0 0 0 / 10%)', 
        border: darktheme ? '2px solid #000' : 'none',
    }

  return (
    <section className="search-params">
        <form onSubmit={submit}>
            <input 
            type="search" 
            placeholder="Search for a country..."
            style={themeStyles}
            value={searchValue}
            id= 'search'
            onChange={(e) => search(e.target.value)}
            />

            <select name="region" id="region" onChange={filter} style={themeStyles}>
              <option value="">All regions</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Americas">America</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>

        </form>
    </section>
  )
}

export default SearchParams
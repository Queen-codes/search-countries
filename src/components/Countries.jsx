import {useContext, useEffect, useState} from 'react'
import ThemeContext from './ThemeContext';
import {Link} from 'react-router-dom'
import SearchParams from './SearchParams';



function Countries() {
    const darktheme = useContext(ThemeContext);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [filterCountries, setFilterCountries] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        requestCountries();

    },[])

    async function requestCountries() {
        try {
            const res = await fetch('https://restcountries.com/v3.1/all')
            if (!res.ok) {
                throw new Error(
                  `This is an HTTP error: The status is ${res.status}`
                );
            }
            const data = await res.json();
            setCountries(data)
            setFilterCountries(data)
            //console.log(data)
            setError(null)
            setLoading(false)
        } catch(err){
            setError(err.message)
            setCountries(null)
            setFilterCountries(null)
        }
        
    }

    function handleSubmit(e) {
        e.preventDefault()
        //ssearchValue('')
        setSearchValue('')
    }

    function search (search) {
        setSearchValue(search)

        if(searchValue) {
            const filtered = countries.filter(country => (
                Object.values(country).join("").toLowerCase().includes(search.toLowerCase())
            ))
            setFilterCountries(filtered)
        }else{
            setFilterCountries(countries)
        }

    }

    const handleFilter = (e) => {
        if (e.target.value === "") {
          setFilterCountries(countries);
        } else {
          setFilterCountries(
            countries.filter((country) => {
              const { region } = country;
              return region.includes(e.target.value);
            })
          );
        }
      };

    
    const cardStyles = {
        backgroundColor: darktheme ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)",
        color: darktheme ? "hsl(0, 0%, 100%)" :  "hsl(200, 15%, 8%)",
        boxShadow: darktheme ? '0 4px 12px rgb(0 0 0 / 10%)' : '0 4px 12px rgb(0 0 0 / 10%)',
    }

  return (
    <>
     {loading ? <h2>Loading...</h2>:   
        
        <main>
           <SearchParams 
           submit={handleSubmit} 
           search={search} 
           setCountries={setCountries} 
           filter={handleFilter}
           searchValue={searchValue}
           />   
             
            <div className="countries-container">
             {filterCountries.map(({name, flags, population, capital, region}) => (
                <Link to={`/${capital}`} key={name.common}>
                <section className="country-card" >
                    <div className="country-flag">
                        <img src={flags.png} alt="country-flag" />
                    </div>

                    <div className="details" style={cardStyles}>
                        <h3>{name.common}</h3>
                        <ul>
                            <li>Capital: {capital}</li>
                            <li>Population: {population.toLocaleString()}</li>
                            <li>Region: {region}</li>
                        </ul>
                    </div>
                </section>
                </Link>
            ))}
       
        </div>
        </main>
        

        
        }
     </>
  )
}

export default Countries
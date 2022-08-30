import {useState, useEffect, useContext} from 'react'
import ThemeContext from './ThemeContext';
import {Link, useParams} from 'react-router-dom'

function Details() {
  const darktheme = useContext(ThemeContext);
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const {capital} = useParams();


    useEffect(() => {
        requestCountry()
    },[capital])


    async function requestCountry() {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/capital/${capital}`)
            if (!res.ok) {
                throw new Error(
                  `This is an HTTP error: The status is ${res.status}`
                );
            }
            const data = await res.json();
            setCountry(data)
            setLoading(false)
        } catch(err){
            //setError(err.message)
            setCountry(null)
        }
        
    }

    const cardStyles = {
      backgroundColor: darktheme ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)",
      color: darktheme ? "hsl(0, 0%, 100%)" :  "hsl(200, 15%, 8%)",
      boxShadow: darktheme ? '0 4px 12px rgb(0 0 0 / 10%)' : '0 4px 12px rgb(0 0 0 / 10%)',
  }
  return (
    <>
    <div className='country-container'>
        <Link to={"/"}> <div className="back" style={cardStyles}><i className='bx bx-arrow-back'></i> Back</div></Link>

          {country.map(({name, population, capital, region, subregion, borders, tld, flags, languages, currencies}) => (

            <article className="country" key={name.common}>
                <section className="country-flag" >
                    <img src={flags.png} alt= "country's flag" />
                </section>

                <section className='detail'>
                    <h3>{name.common}</h3>
                    <ul>
                        <li>Native Name: <span>{Object.values(name.nativeName)[0].common}</span></li>
                        <li>Population: <span>{population.toLocaleString()} </span></li>
                        <li>Region:   <span>{region}</span></li>
                        <li>Subregion: <span>{subregion}</span></li>
                        <li>Capital: <span>{capital}</span></li>
                    </ul>
                  </section>

                    <section className="detail">

                    <ul className='second-list'>
                        <li>Top Domain: <span>{tld.join(", ")}</span></li>
                        <li>Curriences : <span> {Object.keys(currencies)}</span></li>
                        <li>Languages: <span>{Object.values(languages).join(", ")}</span></li>
                    </ul>
                </section>

                <div className='border-container'>
                  <h3>Border Countries: </h3>
                    <div className="borders">
                    {borders === undefined ? <p>No borders for this country </p> : 
                        borders.map(border => (
                          <span key={border} style={cardStyles}>{border}</span>
                        ))
                    }
                    </div>
                </div>
            </article>
            ))} 

        
    </div>
  </>
  )
}

export default Details
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { List } from '../components/List';
import { Controls } from '../components/Controls';
import { Card } from '../components/Card';
import { ALL_COUNTRIES } from '../config';

export const HomePage = ( {countries, setCountries} ) => {
  const [filteredCountries, setFilteredCountries] = useState(countries); 

  // console.log('countries >>>', countries);

  const handleSearch = ((search, region) => {
    let data = [...countries];

    if(region) {
      data = data.filter(item => item.region.includes(region.value))
    }
    if(search) {
      data = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    setFilteredCountries(data);
  })

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(ALL_COUNTRIES).then(
      ({data}) => setCountries(data));
  }, []);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  return (
      <>
        <Controls handleSearch={handleSearch}/>
        <List>
          {
            filteredCountries.sort((a, b) => a.name > b.name ? 1 : -1).map(c => {
              const countryInfo = {
                img: c.flags.png,
                name: c.name,
                info: [
                  {
                    title: 'Population',
                    description: c.population.toLocaleString(),
                  },
                  {
                    title: 'Region',
                    description: c.region,
                  },
                  {
                    title: 'Capital',
                    description: c.capital,
                  },
                ],
              };

              return <Card key={c.name} onClick={() => navigate(`/country/${c.name}`)} {...countryInfo}/>
            })
          }
        </List>
      </>
  )
}

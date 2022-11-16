import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailsInfo } from '../components/DetailsInfo';
import { Button } from '../components/Button';
import { IoArrowBack } from 'react-icons/io5';
import { searchByCountry } from '../config';

export const Details = () => {

  const { name } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(searchByCountry(name)).then(
      ({data}) => setCountry(data[0])
    )
  }, [name])

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {country && (
        <DetailsInfo navigate={navigate} {...country} />
      )}
    </div>
  )
}

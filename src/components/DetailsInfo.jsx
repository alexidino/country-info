import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { filterByCode } from '../config';

const Wrapper = styled.section`
 margin: 3rem 0 0rem;
 width: 100%;
 display: grid;
 grid-template-columns: 100%;
 gap: 2rem;

 @media(min-width: 767px) {
  grid-template-columns: minmax(100px, 400px) 1fr;
  align-items: center;
  gap: 5rem;
 }

 @media(min-width: 1024px) {
  grid-template-columns: minmax(400px, 600px) 1fr;
 }
 `;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  // height: 100%;
  object-fit: contain;
  box-shadow: var(--shadow);
`;

const InfoTitle = styled.h1`
  font-weight: var(--fw-normal);
  margin: 0;
`;

const ListGroup = styled.div`
 display: flex;
 flex-direction: column;
 gap: 2rem;

 @media(min-width: 1024px) {
  flex-direction: row;
  gap: 4rem;
 }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  @media(min-width: )
`;

const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
    margin: 0 0 1rem;

    @media(min-width: 767px) {
      margin: 0 1rem 0 0;
    }
  }

  @media(min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Tag = styled.span`
  padding: 0 1rem;
  line-height: 1.5;
  gap: 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  cursor: pointer;
`;


export const DetailsInfo = (props) => {

  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain = [],
    currencies = [],
    languages = [],
    borders = [],
    navigate,
  } = props;

  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    axios.get(filterByCode(borders)).then(({data}) => setNeighbors(data))
  }, [borders]);
  
  return (
    <Wrapper>
      <InfoImage src={flag} alt='flag' />

      <div>
        <InfoTitle>{name}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native Name:</b> {nativeName}
            </ListItem>
            <ListItem>
              <b>Population:</b> {population}
            </ListItem>
            <ListItem>
              <b>Region:</b> {region}
            </ListItem>
            <ListItem>
              <b>Sub Region:</b> {subregion}
            </ListItem>
            <ListItem>
              <b>Capital:</b> {capital}
            </ListItem>
          </List>

          <List>
            <ListItem>
              <b>Top Level Domain:</b>{' '} 
              {topLevelDomain.map(item => (
                <span key={item}> {item}</span>
              ))};
            </ListItem>
            <ListItem>
              <b>Currencies:</b>{' '}
              {currencies.map(item => (
                  <span key={item.code}> {item.name}</span>
              ))};
            </ListItem>
            <ListItem>
              <b>Languages:</b>{' '} 
              {languages.map(item => (
                  <span key={item.name}> {item.name}</span>
              ))};
            </ListItem>
          </List>
        </ListGroup>
        <Meta>
          <b>Border Countries:</b>
            {!neighbors.length ? (
              <span>There is no border</span>
            ) : (
              <TagGroup>
                {neighbors.map(item => (
                  <Tag key={item.name} onClick={() => navigate(`/country/${item.name}`)} >{item.name}</Tag>
                ))}
              </TagGroup>
            )}
        </Meta>
      </div>
    </Wrapper>
  )
}
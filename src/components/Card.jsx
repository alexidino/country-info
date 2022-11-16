import styled from "styled-components";

const Wrapper = styled.article`
border-radius: var(--radii);
background-color: var(--colors-ui-base);
box-shadow: var(--shadow);
overflow: hidden;
cursor: pointer;
`;

const CardImage = styled.img`
display: block;
width: 100%;
// height: 60%;
object-fit: fill;
object-position: center;
box-shadow: var(--shadow);

@media(min-width: 1024px) {
  height: 50%; 
}
`;

const CardBody = styled.div`
padding: 1rem 1.5rem 2rem;
`;

const CardTitle = styled.h3`
margin: 0;
font-size: var(--fs-md);
font-weight: var(--fw-bold);
`;

const CardList = styled.ul`
list-style: none;
margin: 0;
padding: 1rem 0 0;
`;

const CardListItem = styled.li`
  font-weight: var(--fw-light);
  line-height: 1.5;
  font-size: var(--fs-sm);

  & > b {
    font-weight: var(--fw-bold);
  }
`;

export const Card = ({ img, name, info = [], onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <CardImage src={img} alt='flag'/>
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardList>
          {info.map(el => (
            <CardListItem key={el.title}>
              <b>{el.title}:</b> {el.description}
            </CardListItem>
          ))}
        </CardList>
      </CardBody>
    </Wrapper>
  )
}

import styled from "styled-components";

export const Button = styled.button`
  padding: 0 1rem;
  line-height: 2.5;
  background-color: var(--colors-ui-base);
  color: var(--colors-text);
  border: none;
  border-radius: var(--radii);
  box-shadow: var(--shadow);

  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;
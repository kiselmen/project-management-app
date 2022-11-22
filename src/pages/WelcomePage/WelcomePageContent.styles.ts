import styled from 'styled-components';
import WelcomePagePicture from '../../assets/welcomePage.png';

export const LeftContentWrapper = styled.div`
  max-width: 28.75rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: center;
  align-items: center;
  background: #f0f2f0f0;
  padding: 1rem;
  border-bottom-right-radius: 50%;
  border-top-right-radius: 50%;
`;

export const BtnsWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
`;

export const FirstSection = styled.section`
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 1.5rem;
  background: url(${WelcomePagePicture}) right / contain no-repeat;
`;

export const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

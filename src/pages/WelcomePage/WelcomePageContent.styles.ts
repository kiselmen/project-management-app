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

const sectionMixin = `
width: 100%;
padding-top: 1rem;
padding-bottom: 1rem;
display: flex;
flex-wrap: wrap;
row-gap: 1.5rem;
`;

export const FirstSection = styled.section`
  ${sectionMixin}
  height: 100vh;
  background: url(${WelcomePagePicture}) right / 50% no-repeat;
`;

export const SecondSection = styled.section`
  ${sectionMixin}
  padding-bottom: 3rem;
`;

export const ThirdSection = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  ${sectionMixin}
  padding-bottom: 3rem;
`;

export const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 1rem;
  justify-content: center;
`;

export const paragraphStyle = {
  fontSize: '1.5rem',
  textAlign: 'center',
  color: '#223059',
};

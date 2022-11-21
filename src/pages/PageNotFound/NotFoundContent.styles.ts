import styled, { keyframes } from 'styled-components';

const white = '#EDEDED';
const gray = '#BFC0C0';
const dark = '#585959';

const legsMixin = `
position: absolute;
background: ${white};
top: 85%;
width: 26.4%;
height: 23%;
border: 1px solid ${gray};
z-index: 0;`;

const eyeMixin = `
position: absolute;
background: ${dark};
width: 13px;
height: 13px;
border-radius: 50%;
top: 40%;`;

export const btnHover = {
  '&:hover': {
    background: '#1b2748',
  },
  background: '#223059',
  color: 'white',
};

const scale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const float = keyframes`
  50% {
     transform: translateY(15px);
  }
`;

export const HeadingWrapper = styled.div`
  margin-top: 30px;
`;

export const GhostContainer = styled.div`
  margin: 0 auto;
  position: relative;
  width: 250px;
  height: 250px;
  margin-top: -40px;
`;

export const Ghost = styled.div`
  width: 50%;
  height: 53%;
  left: 25%;
  top: 10%;
  position: absolute;
  border-radius: 50% 50% 0 0;
  background: ${white};
  border: 1px solid ${gray};
  border-bottom: none;
  animation: ${float} 2s ease-out infinite;
`;

export const GhostCopy = styled.div`
  width: 50%;
  height: 57%;
  left: 25%;
  top: 10%;
  position: absolute;
  border-radius: 50% 50% 0 0;
  background: ${white};
  border: 1px solid ${gray};
  border-bottom: none;
  animation: ${float} 2s ease-out infinite;
  z-index: 0;
`;

export const Face = styled.div`
  position: absolute;
  width: 100%;
  height: 60%;
  top: 20%;
`;

export const Eye = styled.div`
  ${eyeMixin}
  left: 25%;
`;
export const EyeRight = styled.div`
  ${eyeMixin}
  right: 25%;
`;

export const Mouth = styled.div`
  position: absolute;
  top: 50%;
  left: 45%;
  width: 10px;
  height: 10px;
  border: 3px solid;
  border-radius: 50%;
  border-color: transparent ${dark} ${dark} transparent;
  transform: rotate(45deg);
`;

export const One = styled.div`
  ${legsMixin}
  border-radius: 0 0 100% 30%;
  left: -1px;
`;

export const Two = styled.div`
  ${legsMixin}
  left: 23%;
  border-radius: 0 0 50% 50%;
`;

export const Three = styled.div`
  ${legsMixin}
  left: 50%;
  border-radius: 0 0 50% 50%;
`;

export const Four = styled.div`
  ${legsMixin}
  left: 74.5%;
  border-radius: 0 0 30% 100%;
`;

export const Shadow = styled.div`
  position: absolute;
  width: 30%;
  height: 7%;
  background: ${gray};
  left: 35%;
  top: 80%;
  border-radius: 50%;
  animation: ${scale} 2s infinite;
`;

export const Bottom = styled.div`
  margin-top: 10px;
`;

export const Heading1 = styled.h1`
  color: #223059;
  text-align: center;
  font-size: 9em;
  margin: 0;
  text-shadow: -1px 0 ${gray}, 0 1px ${gray}, 1px 0 ${gray}, 0 -1px ${gray};
`;
export const Heading3 = styled.h3`
  font-size: 2em;
  text-transform: uppercase;
  text-align: center;
  color: #223059;
  margin-top: -20px;
  font-weight: 900;
`;
export const Paragraph = styled.p`
  text-align: center;
  color: #223059;
  font-size: 0.6em;
  margin-top: -20px;
  text-transform: uppercase;
`;

export const Btns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

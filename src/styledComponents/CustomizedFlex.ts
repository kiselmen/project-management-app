import styled, { css } from 'styled-components';

interface IHeader {
  children?: React.ReactNode;
  iconAndButton?: boolean;
}

const CustomizedFlex = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;

  ${(props: IHeader) =>
    props.iconAndButton &&
    css`
      color: white;
      margin: 0 10px 0 10px;
    `}
`;

export default CustomizedFlex;

import styled, { css } from 'styled-components';

interface IHeader {
  children?: React.ReactNode;
  iconAndButton?: boolean;
  boardHeader?: boolean;
  boardBody?: boolean;
}

const CustomizedFlex = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;

  ${(props: IHeader) =>
    props.iconAndButton &&
    css`
      /* color: white; */
      align-items: flex-end;
      margin: 0 10px 0 10px;
    `}
  ${(props: IHeader) =>
    props.boardHeader &&
    css`
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      /* color: white; */
      margin: 0 10px 0 10px;
      height: 32px;
    `}
  ${(props: IHeader) =>
    props.boardBody &&
    css`
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      flex-direction: row;
      color: white;
      margin: 0 10px 0 10px;
      height: 32px;
    `}
`;

export default CustomizedFlex;

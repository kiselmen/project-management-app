import styled from 'styled-components';
import { SearchBarForm } from '../../components/forms/SearchBarForm';
import { SortingBarForm } from '../../components/forms/SortingBarForm';

const ToolsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  column-gap: 20px;
`;

export const AdditionalTools = () => {
  return (
    <>
      <ToolsWrapper>
        <SearchBarForm />
        <SortingBarForm />
      </ToolsWrapper>
    </>
  );
};

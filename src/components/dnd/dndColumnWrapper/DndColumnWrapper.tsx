import { Box } from '@mui/material';
import { Direction, Droppable } from 'react-beautiful-dnd';
import { ReactI18NextChild } from 'react-i18next';

interface IColumnWrapper {
  droppableId: string;
  index?: number;
  children: ReactI18NextChild | Iterable<ReactI18NextChild>;
  directction: Direction;
  type?: string;
}

const DndColumnsWrapper = (props: IColumnWrapper) => (
  <Droppable droppableId={props.droppableId} direction={props.directction} type={props.type}>
    {(provided) => (
      <Box sx={{ minWidth: '100%' }} ref={provided.innerRef} {...provided.droppableProps}>
        {props.children}
        {provided.placeholder}
      </Box>
    )}
  </Droppable>
);

export default DndColumnsWrapper;

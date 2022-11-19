import { Droppable } from 'react-beautiful-dnd';
import { ReactI18NextChild } from 'react-i18next';

interface IColumnWrapper {
  droppableId: string;
  index?: number;
  children: ReactI18NextChild | Iterable<ReactI18NextChild>;
}

const DndColumnsWrapper = (props: IColumnWrapper) => (
  <Droppable droppableId={props.droppableId} direction="horizontal">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {props.children}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default DndColumnsWrapper;

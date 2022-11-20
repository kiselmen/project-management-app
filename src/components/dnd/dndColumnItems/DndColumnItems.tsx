import { Draggable } from 'react-beautiful-dnd';
import { ReactI18NextChild } from 'react-i18next';

interface IDraggableItem {
  draggableId: string;
  index: number;
  children: ReactI18NextChild | Iterable<ReactI18NextChild>;
}

const DndColumnItems = (props: IDraggableItem) => (
  <Draggable draggableId={props.draggableId} index={props.index}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        {props.children}
      </div>
    )}
  </Draggable>
);

export default DndColumnItems;

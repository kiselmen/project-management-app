import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { ReactI18NextChild } from 'react-i18next';

interface IDraggableItem {
  draggableId: string;
  index: number;
  children: ReactI18NextChild | Iterable<ReactI18NextChild>;
}
const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  // background: isDragging ? '#4a2975' : 'white',
  color: isDragging ? '#223059' : 'white',
  ...draggableStyle,
});

const DndColumnItems = (props: IDraggableItem) => (
  <Draggable draggableId={props.draggableId} index={props.index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        {props.children}
      </div>
    )}
  </Draggable>
);

export default DndColumnItems;

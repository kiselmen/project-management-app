import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

interface DndColumnContextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDragEnd: (result: any) => void;
  children: React.ReactNode;
}

const DndColumnContext = (props: DndColumnContextProps) => (
  <div>
    <DragDropContext onDragEnd={props.onDragEnd}>{props.children}</DragDropContext>
  </div>
);

export default DndColumnContext;

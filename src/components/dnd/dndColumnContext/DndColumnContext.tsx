import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface DndColumnContextProps {
  onDragEnd: (result: DropResult) => void;
  children: React.ReactNode;
}

const DndColumnContext = (props: DndColumnContextProps) => (
  <div>
    <DragDropContext onDragEnd={props.onDragEnd}>{props.children}</DragDropContext>
  </div>
);

export default DndColumnContext;

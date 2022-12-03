import { Box } from '@mui/material';
import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface DndColumnContextProps {
  onDragEnd: (result: DropResult) => void;
  children: React.ReactNode;
}

const DndColumnContext = (props: DndColumnContextProps) => (
  <Box display="flex" sx={{ overflowY: 'clip', minWidth: '100%' }}>
    <DragDropContext onDragEnd={props.onDragEnd}>{props.children}</DragDropContext>
  </Box>
);

export default DndColumnContext;

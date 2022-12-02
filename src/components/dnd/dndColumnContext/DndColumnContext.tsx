import { Box } from '@mui/material';
import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface DndColumnContextProps {
  onDragEnd: (result: DropResult) => void;
  children: React.ReactNode;
}

const DndColumnContext = (props: DndColumnContextProps) => (
  // <Box flexGrow={1}>
  <Box display="flex" sx={{ overflowY: 'clip', mt: '60px', minWidth: '95vw' }}>
    <DragDropContext onDragEnd={props.onDragEnd}>{props.children}</DragDropContext>
  </Box>
);

export default DndColumnContext;

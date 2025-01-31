import { useEffect, useState } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

export const StrictModeDroppable = ({ 
  children, 
  isDropDisabled = false, 
  isCombineEnabled = false,
  ignoreContainerClipping = false,
  ...props 
}: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setEnabled(true);
    });

    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable 
      isDropDisabled={Boolean(isDropDisabled)}
      isCombineEnabled={Boolean(isCombineEnabled)}
      ignoreContainerClipping={Boolean(ignoreContainerClipping)}
      {...props}
    >
      {children}
    </Droppable>
  );
}; 
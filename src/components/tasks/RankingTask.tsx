import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { RankingItem } from '../../types';

interface SortableItemProps {
  item: RankingItem;
  index: number;
}

function SortableItem({ item, index }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3.5 bg-white border rounded-xl transition-all ${
        isDragging
          ? 'border-indigo-300 shadow-lg ring-2 ring-indigo-100 z-50 opacity-90'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold flex items-center justify-center flex-shrink-0">
        {index + 1}
      </span>
      <span className="flex-1 text-sm text-gray-700">{item.label}</span>
      <button
        {...attributes}
        {...listeners}
        className="p-1 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical size={16} />
      </button>
    </div>
  );
}

interface RankingTaskProps {
  items: RankingItem[];
  onChange: (orderedIds: string[]) => void;
}

export function RankingTask({ items: initialItems, onChange }: RankingTaskProps) {
  const [items, setItems] = useState<RankingItem[]>(initialItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      onChange(newItems.map((i) => i.id));
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <SortableItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

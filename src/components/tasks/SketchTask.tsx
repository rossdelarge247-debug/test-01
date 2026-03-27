import { useState } from 'react';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface SketchBlock {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'step' | 'decision' | 'input' | 'output';
}

interface Connection {
  from: string;
  to: string;
}

const BLOCK_TYPES = [
  { type: 'step' as const, label: 'Step', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { type: 'decision' as const, label: 'Decision', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { type: 'input' as const, label: 'Input', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { type: 'output' as const, label: 'Output', color: 'bg-violet-50 border-violet-200 text-violet-700' },
];

const BLOCK_COLORS = {
  step: 'bg-blue-50 border-blue-200 text-blue-800',
  decision: 'bg-amber-50 border-amber-200 text-amber-800',
  input: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  output: 'bg-violet-50 border-violet-200 text-violet-800',
};

const DEFAULT_BLOCKS: SketchBlock[] = [
  { id: '1', label: 'New request arrives', x: 40, y: 40, type: 'input' },
  { id: '2', label: 'Categorise & tag', x: 220, y: 40, type: 'step' },
  { id: '3', label: 'Priority check', x: 400, y: 40, type: 'decision' },
  { id: '4', label: 'Assign to queue', x: 580, y: 40, type: 'step' },
  { id: '5', label: 'Done / resolved', x: 400, y: 140, type: 'output' },
];

const DEFAULT_CONNECTIONS: Connection[] = [
  { from: '1', to: '2' },
  { from: '2', to: '3' },
  { from: '3', to: '4' },
  { from: '3', to: '5' },
];

interface SketchTaskProps {
  onChange: (data: string) => void;
}

export function SketchTask({ onChange }: SketchTaskProps) {
  const [blocks, setBlocks] = useState<SketchBlock[]>(DEFAULT_BLOCKS);
  const [connections] = useState<Connection[]>(DEFAULT_CONNECTIONS);
  const [selectedType, setSelectedType] = useState<SketchBlock['type']>('step');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [notes, setNotes] = useState('');

  function addBlock() {
    const newBlock: SketchBlock = {
      id: String(Date.now()),
      label: 'New step',
      x: 40 + (blocks.length % 4) * 180,
      y: 40 + Math.floor(blocks.length / 4) * 80,
      type: selectedType,
    };
    setBlocks([...blocks, newBlock]);
    onChange(JSON.stringify({ blocks: [...blocks, newBlock], notes }));
  }

  function removeBlock(id: string) {
    const updated = blocks.filter((b) => b.id !== id);
    setBlocks(updated);
    onChange(JSON.stringify({ blocks: updated, notes }));
  }

  function updateLabel(id: string, label: string) {
    const updated = blocks.map((b) => (b.id === id ? { ...b, label } : b));
    setBlocks(updated);
    onChange(JSON.stringify({ blocks: updated, notes }));
  }

  function handleSubmit() {
    setSubmitted(true);
    onChange(JSON.stringify({ blocks, connections, notes, submitted: true }));
  }

  if (submitted) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <ArrowRight size={18} className="text-indigo-600" />
        </div>
        <p className="text-sm font-medium text-gray-700">Sketch submitted</p>
        <p className="text-xs text-gray-400 mt-1">Your process sketch has been captured.</p>
        <button onClick={() => setSubmitted(false)} className="mt-3 text-xs text-indigo-600 hover:underline">
          Edit sketch
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-gray-500">Add block:</span>
        {BLOCK_TYPES.map((bt) => (
          <button
            key={bt.type}
            onClick={() => setSelectedType(bt.type)}
            className={clsx(
              'px-2.5 py-1 text-xs rounded-lg border font-medium transition-all',
              selectedType === bt.type
                ? bt.color + ' ring-2 ring-offset-1 ring-indigo-200'
                : bt.color + ' opacity-60 hover:opacity-100'
            )}
          >
            {bt.label}
          </button>
        ))}
        <button
          onClick={addBlock}
          className="flex items-center gap-1 px-2.5 py-1 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={12} />
          Add
        </button>
      </div>

      <div className="border border-gray-200 rounded-xl bg-gray-50 p-4 min-h-[200px]">
        <p className="text-xs text-gray-400 mb-3">Process flow — click labels to edit</p>
        <div className="flex flex-wrap gap-3 items-center">
          {blocks.map((block, index) => (
            <div key={block.id} className="flex items-center gap-1">
              <div className={clsx('relative group px-3 py-2 border-2 rounded-lg text-xs font-medium min-w-[100px] text-center', BLOCK_COLORS[block.type])}>
                {editingId === block.id ? (
                  <input
                    autoFocus
                    value={block.label}
                    onChange={(e) => updateLabel(block.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    className="bg-transparent w-full text-center focus:outline-none text-xs"
                  />
                ) : (
                  <span
                    onClick={() => setEditingId(block.id)}
                    className="cursor-text block"
                  >
                    {block.label}
                  </span>
                )}
                <button
                  onClick={() => removeBlock(block.id)}
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center transition-opacity"
                >
                  <Trash2 size={9} />
                </button>
              </div>
              {index < blocks.length - 1 && (
                <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />
              )}
            </div>
          ))}
          {blocks.length === 0 && (
            <p className="text-xs text-gray-400 italic">Add blocks above to build your process sketch.</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600">Optional notes on your thinking</label>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            onChange(JSON.stringify({ blocks, connections, notes: e.target.value }));
          }}
          placeholder="Any context on why you've structured it this way..."
          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none placeholder-gray-400 text-gray-600"
          rows={2}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
      >
        Submit sketch
      </button>
    </div>
  );
}

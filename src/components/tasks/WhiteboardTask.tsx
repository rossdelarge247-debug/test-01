import { useRef, useState, useEffect, useCallback } from 'react';
import {
  Pen,
  Eraser,
  Type,
  Trash2,
  Undo2,
  Download,
  Check,
} from 'lucide-react';
import { clsx } from 'clsx';

// ── Types ──────────────────────────────────────────────────────────────────

type Tool = 'pen' | 'eraser' | 'text';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  tool: 'pen' | 'eraser';
  points: Point[];
  color: string;
  size: number;
}

interface TextLabel {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  fontSize: number;
}

// ── Constants ──────────────────────────────────────────────────────────────

const COLORS = [
  { value: '#1e293b', label: 'Ink' },
  { value: '#4f46e5', label: 'Indigo' },
  { value: '#0891b2', label: 'Cyan' },
  { value: '#059669', label: 'Emerald' },
  { value: '#d97706', label: 'Amber' },
  { value: '#dc2626', label: 'Red' },
  { value: '#7c3aed', label: 'Violet' },
  { value: '#94a3b8', label: 'Slate' },
];

const PEN_SIZES = [
  { value: 2, label: 'XS' },
  { value: 4, label: 'S' },
  { value: 7, label: 'M' },
  { value: 12, label: 'L' },
];

const ERASER_SIZES = [
  { value: 12, label: 'S' },
  { value: 24, label: 'M' },
  { value: 40, label: 'L' },
];

const TEXT_SIZES = [
  { value: 13, label: 'S' },
  { value: 16, label: 'M' },
  { value: 22, label: 'L' },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function getPos(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): Point {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  if ('touches' in e) {
    const touch = e.touches[0] || e.changedTouches[0];
    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY,
    };
  }
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  if (stroke.points.length < 2) return;
  ctx.save();
  ctx.globalCompositeOperation =
    stroke.tool === 'eraser' ? 'destination-out' : 'source-over';
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  for (let i = 1; i < stroke.points.length - 1; i++) {
    const mx = (stroke.points[i].x + stroke.points[i + 1].x) / 2;
    const my = (stroke.points[i].y + stroke.points[i + 1].y) / 2;
    ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, mx, my);
  }
  const last = stroke.points[stroke.points.length - 1];
  ctx.lineTo(last.x, last.y);
  ctx.stroke();
  ctx.restore();
}

function drawAllLabels(
  ctx: CanvasRenderingContext2D,
  labels: TextLabel[],
  editingId: string | null
) {
  labels.forEach((label) => {
    if (!label.text && label.id !== editingId) return;
    ctx.save();
    ctx.font = `500 ${label.fontSize}px Inter, system-ui, sans-serif`;
    ctx.fillStyle = label.color;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillText(label.text, label.x, label.y);
    ctx.restore();
  });
}

function redrawAll(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  strokes: Stroke[],
  labels: TextLabel[],
  editingId: string | null
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes.forEach((s) => drawStroke(ctx, s));
  drawAllLabels(ctx, labels, editingId);
}

// ── Component ──────────────────────────────────────────────────────────────

interface WhiteboardTaskProps {
  prompt?: string;
  placeholder?: string;
  onChange: (dataUrl: string) => void;
}

export function WhiteboardTask({ placeholder, onChange }: WhiteboardTaskProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState(COLORS[0].value);
  const [penSize, setPenSize] = useState(4);
  const [eraserSize, setEraserSize] = useState(24);
  const [fontSize, setFontSize] = useState(16);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [labels, setLabels] = useState<TextLabel[]>([]);
  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Drawing state (refs to avoid stale closures)
  const isDrawing = useRef(false);
  const currentStroke = useRef<Stroke | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const labelsRef = useRef<TextLabel[]>([]);

  strokesRef.current = strokes;
  labelsRef.current = labels;

  // ── Canvas setup ──────────────────────────────────────────────────────

  const getCtx = useCallback((): CanvasRenderingContext2D | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Retina / high-DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  // ── Redraw whenever state changes ────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    redrawAll(ctx, canvas, strokes, labels, editingLabel);
  }, [strokes, labels, editingLabel, getCtx]);

  // ── Pointer events ────────────────────────────────────────────────────

  const onPointerDown = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      e.preventDefault();

      if (tool === 'text') {
        const pos = getPos(e, canvas);
        const newLabel: TextLabel = {
          id: String(Date.now()),
          x: pos.x / (window.devicePixelRatio || 1),
          y: pos.y / (window.devicePixelRatio || 1),
          text: '',
          color,
          fontSize,
        };
        setLabels((prev) => [...prev, newLabel]);
        setEditingLabel(newLabel.id);
        setHasDrawn(true);
        return;
      }

      isDrawing.current = true;
      const pos = getPos(e, canvas);
      const dpr = window.devicePixelRatio || 1;
      currentStroke.current = {
        tool: tool as 'pen' | 'eraser',
        points: [{ x: pos.x / dpr, y: pos.y / dpr }],
        color: tool === 'eraser' ? '#000000' : color,
        size: tool === 'eraser' ? eraserSize : penSize,
      };
      setHasDrawn(true);
    },
    [tool, color, penSize, eraserSize, fontSize]
  );

  const onPointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDrawing.current || !currentStroke.current) return;
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    e.preventDefault();

    const dpr = window.devicePixelRatio || 1;
    const pos = getPos(e, canvas);
    const point = { x: pos.x / dpr, y: pos.y / dpr };
    currentStroke.current.points.push(point);

    // Draw incrementally for performance
    const pts = currentStroke.current.points;
    if (pts.length >= 3) {
      ctx.save();
      ctx.globalCompositeOperation =
        currentStroke.current.tool === 'eraser' ? 'destination-out' : 'source-over';
      ctx.strokeStyle = currentStroke.current.color;
      ctx.lineWidth = currentStroke.current.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const i = pts.length - 2;
      const mx = (pts[i].x + pts[i + 1].x) / 2;
      const my = (pts[i].y + pts[i + 1].y) / 2;
      ctx.beginPath();
      ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      ctx.stroke();
      ctx.restore();
    }
  }, [getCtx]);

  const onPointerUp = useCallback(() => {
    if (!isDrawing.current || !currentStroke.current) return;
    isDrawing.current = false;
    const stroke = currentStroke.current;
    currentStroke.current = null;
    if (stroke.points.length > 1) {
      setStrokes((prev) => {
        const next = [...prev, stroke];
        strokesRef.current = next;
        return next;
      });
    }
  }, []);

  // Attach/detach events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    canvas.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
    return () => {
      canvas.removeEventListener('mousedown', onPointerDown);
      canvas.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('touchstart', onPointerDown);
      canvas.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [onPointerDown, onPointerMove, onPointerUp]);

  // ── Text editing ──────────────────────────────────────────────────────

  function handleTextInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setLabels((prev) =>
      prev.map((l) => (l.id === editingLabel ? { ...l, text: value } : l))
    );
  }

  function commitText() {
    setLabels((prev) => prev.filter((l) => l.id !== editingLabel || l.text.trim()));
    setEditingLabel(null);
  }

  const editingLabelData = labels.find((l) => l.id === editingLabel);

  // ── Actions ───────────────────────────────────────────────────────────

  function handleUndo() {
    if (editingLabel) {
      setLabels((prev) => prev.filter((l) => l.id !== editingLabel));
      setEditingLabel(null);
      return;
    }
    // Undo last stroke or last label
    if (strokes.length > 0) {
      setStrokes((prev) => prev.slice(0, -1));
    } else if (labels.length > 0) {
      setLabels((prev) => prev.slice(0, -1));
    }
  }

  function handleClear() {
    setStrokes([]);
    setLabels([]);
    setEditingLabel(null);
    setHasDrawn(false);
    setSubmitted(false);
  }

  function handleSubmit() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    commitText();
    // Export with white background
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(canvas, 0, 0);
    const dataUrl = exportCanvas.toDataURL('image/png');
    onChange(dataUrl);
    setSubmitted(true);
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(canvas, 0, 0);
    const link = document.createElement('a');
    link.download = 'signal-sketch.png';
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  }

  const currentSize = tool === 'pen' ? penSize : tool === 'eraser' ? eraserSize : fontSize;
  const sizeOptions = tool === 'pen' ? PEN_SIZES : tool === 'eraser' ? ERASER_SIZES : TEXT_SIZES;

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap bg-white border border-gray-200 rounded-xl px-3 py-2">
        {/* Tools */}
        <div className="flex items-center gap-1 pr-3 border-r border-gray-200">
          {([
            { id: 'pen', icon: <Pen size={15} />, title: 'Pen' },
            { id: 'eraser', icon: <Eraser size={15} />, title: 'Eraser' },
            { id: 'text', icon: <Type size={15} />, title: 'Text label' },
          ] as const).map((t) => (
            <button
              key={t.id}
              title={t.title}
              onClick={() => { setTool(t.id); setEditingLabel(null); }}
              className={clsx(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                tool === t.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              {t.icon}
            </button>
          ))}
        </div>

        {/* Sizes */}
        <div className="flex items-center gap-1 pr-3 border-r border-gray-200">
          {sizeOptions.map((s) => (
            <button
              key={s.value}
              title={s.label}
              onClick={() => {
                if (tool === 'pen') setPenSize(s.value);
                else if (tool === 'eraser') setEraserSize(s.value);
                else setFontSize(s.value);
              }}
              className={clsx(
                'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all',
                currentSize === s.value
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Colors (hidden for eraser) */}
        {tool !== 'eraser' && (
          <div className="flex items-center gap-1.5 pr-3 border-r border-gray-200">
            {COLORS.map((c) => (
              <button
                key={c.value}
                title={c.label}
                onClick={() => setColor(c.value)}
                className={clsx(
                  'w-5 h-5 rounded-full transition-all border-2',
                  color === c.value ? 'border-gray-400 scale-125' : 'border-transparent hover:scale-110'
                )}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            title="Undo"
            onClick={handleUndo}
            disabled={strokes.length === 0 && labels.length === 0}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-all"
          >
            <Undo2 size={15} />
          </button>
          <button
            title="Download sketch"
            onClick={handleDownload}
            disabled={!hasDrawn}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-all"
          >
            <Download size={15} />
          </button>
          <button
            title="Clear canvas"
            onClick={handleClear}
            disabled={!hasDrawn}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 disabled:opacity-30 transition-all"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="relative border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        {/* Placeholder text */}
        {!hasDrawn && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <p className="text-gray-300 text-sm select-none">
              {placeholder || 'Draw your sketch here — use the tools above'}
            </p>
          </div>
        )}

        {/* Inline text input overlay */}
        {editingLabel && editingLabelData && (
          <input
            autoFocus
            value={editingLabelData.text}
            onChange={handleTextInput}
            onBlur={commitText}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Escape') commitText();
            }}
            className="absolute z-20 bg-transparent border-b border-dashed outline-none text-sm"
            style={{
              left: `${(editingLabelData.x / (canvasRef.current?.width || 1)) * 100}%`,
              top: `${(editingLabelData.y / (canvasRef.current?.height || 1)) * 100}%`,
              color: editingLabelData.color,
              fontSize: `${editingLabelData.fontSize}px`,
              minWidth: '80px',
            }}
          />
        )}

        <canvas
          ref={canvasRef}
          className="w-full touch-none block"
          style={{
            height: '360px',
            cursor:
              tool === 'pen'
                ? 'crosshair'
                : tool === 'eraser'
                ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='white' stroke='%23999' stroke-width='1.5'/%3E%3C/svg%3E\") 12 12, auto"
                : 'text',
          }}
        />
      </div>

      {/* Footer: hint + submit */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {tool === 'text'
            ? 'Click anywhere on the canvas to add a text label'
            : tool === 'eraser'
            ? 'Click and drag to erase'
            : 'Draw freely — this is about thinking, not artistry'}
        </p>
        <button
          onClick={handleSubmit}
          disabled={!hasDrawn || submitted}
          className={clsx(
            'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all',
            submitted
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {submitted ? (
            <>
              <Check size={14} />
              Sketch submitted
            </>
          ) : (
            'Submit sketch'
          )}
        </button>
      </div>
    </div>
  );
}

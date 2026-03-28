import { useTheme } from '../../context/ThemeContext';

export type AvatarStage = 0 | 1 | 2 | 3 | 4;

export const STAGE_LABELS: Record<AvatarStage, string> = {
  0: 'No signal yet',
  1: 'Getting started',
  2: 'Building signal',
  3: 'Signal complete',
  4: 'Active match',
};

export function getAvatarStage(
  tasksCompleted: number,
  totalTasks: number,
  hasMatch: boolean
): AvatarStage {
  if (tasksCompleted >= totalTasks && hasMatch) return 4;
  if (tasksCompleted >= totalTasks) return 3;
  if (tasksCompleted === 0) return 0;
  if (tasksCompleted / totalTasks < 0.5) return 1;
  return 2;
}

// ── Corporate: Assembling Hexagon ─────────────────────────────────────────────
// Six triangles fill in clockwise from the top, light indigo → deep indigo.

const TRI_COLORS = ['#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#3730a3'];

function hexVert(i: number) {
  const a = -Math.PI / 2 + (Math.PI / 3) * i;
  return {
    x: +(24 + 18 * Math.cos(a)).toFixed(2),
    y: +(24 + 18 * Math.sin(a)).toFixed(2),
  };
}

function CorporateAvatar({ stage }: { stage: AvatarStage }) {
  const fillCounts: Record<AvatarStage, number> = { 0: 0, 1: 2, 2: 4, 3: 6, 4: 6 };
  const filled = fillCounts[stage];

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {stage === 4 && (
        <circle
          cx="24" cy="24" r="22"
          stroke="#4f46e5" strokeWidth="1"
          strokeDasharray="2.5 2" opacity="0.4"
        />
      )}
      {Array.from({ length: 6 }, (_, i) => {
        const v1 = hexVert(i);
        const v2 = hexVert((i + 1) % 6);
        const isFilled = i < filled;
        return (
          <path
            key={i}
            d={`M 24 24 L ${v1.x} ${v1.y} L ${v2.x} ${v2.y} Z`}
            fill={isFilled ? TRI_COLORS[i] : 'none'}
            stroke="#4f46e5"
            strokeWidth={isFilled ? 0.5 : 0.5}
            opacity={isFilled ? 1 : 0.18}
          />
        );
      })}
      {stage === 4 && <circle cx="24" cy="24" r="2.5" fill="white" />}
    </svg>
  );
}

// ── Bumble: Minimal Character ─────────────────────────────────────────────────
// Faceless figure builds up from dashed outline → gray fill → full Bumble yellow.

function BumbleAvatar({ stage }: { stage: AvatarStage }) {
  const yellow = '#FBCE3B';
  const muted = '#d1d5db';
  const outline = '#9ca3af';

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      {stage >= 1 && (
        <rect
          x="17" y="24" width="14" height="18" rx="7"
          fill={stage >= 3 ? yellow : stage >= 2 ? muted : 'none'}
          stroke={stage <= 1 ? outline : 'none'}
          strokeWidth="1"
          strokeDasharray={stage === 1 ? '2 1.5' : undefined}
        />
      )}
      {/* Arms */}
      {stage >= 2 && (
        <>
          <path
            d="M 17 28 Q 11 29 10 35"
            stroke={stage >= 3 ? yellow : muted}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 31 28 Q 37 29 38 35"
            stroke={stage >= 3 ? yellow : muted}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      )}
      {/* Head */}
      <circle
        cx="24" cy="13" r="9"
        fill={stage >= 3 ? yellow : stage >= 1 ? muted : 'none'}
        stroke={stage === 0 ? outline : 'none'}
        strokeWidth="1"
        strokeDasharray={stage === 0 ? '2.5 1.5' : undefined}
      />
      {/* Sparkles for stage 4 */}
      {stage === 4 && (
        <>
          <line x1="8" y1="9" x2="8" y2="13" stroke={yellow} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="11" x2="10" y2="11" stroke={yellow} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="39" y1="7" x2="39" y2="10" stroke={yellow} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="37.5" y1="8.5" x2="40.5" y2="8.5" stroke={yellow} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="41" cy="20" r="1.5" fill={yellow} opacity="0.8" />
        </>
      )}
    </svg>
  );
}

// ── Hinge: Signal Arcs ────────────────────────────────────────────────────────
// WiFi-style arcs build outward from a base dot — innermost first.

function signalArcPath(r: number): string {
  const a = Math.PI / 4;
  const x1 = (24 - r * Math.cos(a)).toFixed(1);
  const y1 = (38 - r * Math.sin(a)).toFixed(1);
  const x2 = (24 + r * Math.cos(a)).toFixed(1);
  // sweep-flag=1 (clockwise) arcs through the top — correct for upward WiFi arcs
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1}`;
}

const ARC_RADII = [6, 12, 18, 24];

function SignalAvatar({ stage }: { stage: AvatarStage }) {
  const color = '#1a4731';

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {ARC_RADII.slice(0, stage).map((r, i) => (
        <path
          key={r}
          d={signalArcPath(r)}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={1 - i * 0.15}
        />
      ))}
      {/* Base dot */}
      <circle
        cx="24" cy="38" r="2.5"
        fill={stage > 0 ? color : '#9ca3af'}
        opacity={stage === 0 ? 0.3 : 1}
      />
      {/* Stage 4: soft glow ring around dot */}
      {stage === 4 && (
        <circle cx="24" cy="38" r="5.5" fill={color} opacity="0.12" />
      )}
    </svg>
  );
}

// ── Volt: 3×3 Dot Grid ───────────────────────────────────────────────────────
// Fills from centre outward: centre → cross → full grid → grid + outer frame.

const DOT_POS = [
  { x: 12, y: 12 }, { x: 24, y: 12 }, { x: 36, y: 12 },
  { x: 12, y: 24 }, { x: 24, y: 24 }, { x: 36, y: 24 },
  { x: 12, y: 36 }, { x: 24, y: 36 }, { x: 36, y: 36 },
];
// Indices filled at each stage
const VOLT_FILLED: number[][] = [
  [],
  [4],
  [1, 3, 4, 5, 7],
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
];

function VoltAvatar({ stage }: { stage: AvatarStage }) {
  const lime = '#CFFF04';
  const filled = new Set(VOLT_FILLED[stage]);
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {stage === 4 && (
        <rect x="4" y="4" width="40" height="40" rx="2"
          stroke={lime} strokeWidth="0.75" strokeDasharray="3 2.5" opacity="0.4"
        />
      )}
      {DOT_POS.map((pos, i) => (
        <circle
          key={i}
          cx={pos.x} cy={pos.y}
          r={stage === 4 && filled.has(i) ? 4.5 : 4}
          fill={filled.has(i) ? lime : 'none'}
          stroke={filled.has(i) ? 'none' : '#3a3a3a'}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

interface ProfileAvatarProps {
  stage: AvatarStage;
  size?: number;
  showLabel?: boolean;
}

export function ProfileAvatar({ stage, size = 56, showLabel = false }: ProfileAvatarProps) {
  const { themeId } = useTheme();

  const avatar =
    themeId === 'bumble' ? <BumbleAvatar stage={stage} /> :
    themeId === 'hinge'  ? <SignalAvatar stage={stage} /> :
    themeId === 'volt'   ? <VoltAvatar stage={stage} /> :
                           <CorporateAvatar stage={stage} />;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div style={{ width: size, height: size }}>
        {avatar}
      </div>
      {showLabel && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          {STAGE_LABELS[stage]}
        </span>
      )}
    </div>
  );
}

// ── All-stages showcase (for landing pages / about) ───────────────────────────

export function AvatarStagesShowcase() {
  const stages: AvatarStage[] = [0, 1, 2, 3, 4];
  return (
    <div className="flex items-end justify-center gap-6 flex-wrap">
      {stages.map((s) => (
        <ProfileAvatar key={s} stage={s} size={48} showLabel />
      ))}
    </div>
  );
}

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, Pencil, Sparkles } from 'lucide-react';
import { BLANK_SIGNAL_TASKS, SKETCH_TASKS } from '../../data/tasks';
import { useCandidateSession } from '../../context/CandidateSessionContext';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { RankingTask } from '../../components/tasks/RankingTask';
import { TradeoffTask } from '../../components/tasks/TradeoffTask';
import { ScenarioTask } from '../../components/tasks/ScenarioTask';
import { CritiqueTask } from '../../components/tasks/CritiqueTask';
import { WhiteboardTask } from '../../components/tasks/WhiteboardTask';

const ALL_TASKS = [...BLANK_SIGNAL_TASKS, ...SKETCH_TASKS];

const TASK_TYPE_LABELS: Record<string, string> = {
  ranking: 'Prioritisation task',
  tradeoff: 'Trade-off choice',
  scenario: 'Scenario response',
  critique: 'Critique task',
  sketch: 'Visual sketch task',
};

export function SignalTaskFlow() {
  const [currentTask, setCurrentTask] = useState(0);
  const [responses, setResponses] = useState<Record<string, unknown>>({});
  const navigate = useNavigate();
  const { recommendedTaskIds } = useCandidateSession();

  // Use recommended tasks if set, otherwise fall back to the default pack
  const tasks = useMemo(() => {
    if (recommendedTaskIds.length > 0) {
      const resolved = recommendedTaskIds
        .map((id) => ALL_TASKS.find((t) => t.id === id))
        .filter((t): t is (typeof ALL_TASKS)[number] => t !== undefined);
      return resolved.length > 0 ? resolved : BLANK_SIGNAL_TASKS;
    }
    return BLANK_SIGNAL_TASKS;
  }, [recommendedTaskIds]);

  const isRecommended = recommendedTaskIds.length > 0;
  const task = tasks[currentTask];
  const isLast = currentTask === tasks.length - 1;

  const STEPS = tasks.map((t, i) => ({
    id: i + 1,
    label: t.type === 'sketch' ? 'Sketch' : t.type.charAt(0).toUpperCase() + t.type.slice(1),
  }));

  function handleResponse(value: unknown) {
    setResponses((prev) => ({ ...prev, [task.id]: value }));
  }

  function handleNext() {
    if (isLast) {
      sessionStorage.setItem('signal_responses', JSON.stringify(responses));
      navigate('/candidate/profile-complete');
    } else {
      setCurrentTask((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  }

  const hasResponse = !!responses[task.id];
  // Sketch tasks are always advanceable (submitted state handled inside whiteboard)
  const canAdvance = task.type === 'sketch' ? true : hasResponse;

  return (
    <div className={`mx-auto px-6 py-12 ${task.type === 'sketch' ? 'max-w-3xl' : 'max-w-2xl'}`}>
      <div className="mb-8 overflow-x-auto">
        <StepIndicator steps={STEPS} currentStep={currentTask + 1} />
      </div>

      {isRecommended && (
        <div className="flex items-center gap-1.5 mb-4 text-xs text-indigo-600 font-medium">
          <Sparkles size={12} />
          Recommended for your background
        </div>
      )}

      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
          {TASK_TYPE_LABELS[task.type] || task.type}
        </span>
        {task.type === 'sketch' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-50 border border-violet-100 rounded-full text-xs text-violet-600 font-medium">
            <Pencil size={10} />
            draw your answer
          </span>
        )}
        {task.timeLimit && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <Clock size={11} />
            ~{task.timeLimit} min
          </span>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">{task.title}</h2>
      <p className="text-gray-500 leading-relaxed mb-6">{task.instructions}</p>

      {/* Sketch prompt callout */}
      {task.type === 'sketch' && task.sketchPrompt && (
        <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-violet-50 border border-violet-100 rounded-xl">
          <Pencil size={14} className="text-violet-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-violet-700 leading-relaxed">{task.sketchPrompt}</p>
        </div>
      )}

      <div className="mb-8">
        {task.type === 'ranking' && task.rankingItems && (
          <RankingTask items={task.rankingItems} onChange={(ids) => handleResponse(ids)} />
        )}
        {task.type === 'tradeoff' && task.tradeoffOptions && (
          <TradeoffTask options={task.tradeoffOptions} onSelect={(id, rationale) => handleResponse({ id, rationale })} />
        )}
        {task.type === 'scenario' && (
          <ScenarioTask onChange={(text) => handleResponse(text)} />
        )}
        {task.type === 'critique' && task.critiqueArtifact && (
          <CritiqueTask artifact={task.critiqueArtifact} onChange={(text) => handleResponse(text)} />
        )}
        {task.type === 'sketch' && (
          <WhiteboardTask
            prompt={task.sketchPrompt}
            placeholder={task.sketchPlaceholder}
            onChange={(dataUrl) => handleResponse(dataUrl)}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Task {currentTask + 1} of {BLANK_SIGNAL_TASKS.length}
        </p>
        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLast ? 'Complete profile' : 'Next task'}
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

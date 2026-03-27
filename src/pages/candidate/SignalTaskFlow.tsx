import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { BLANK_SIGNAL_TASKS } from '../../data/tasks';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { RankingTask } from '../../components/tasks/RankingTask';
import { TradeoffTask } from '../../components/tasks/TradeoffTask';
import { ScenarioTask } from '../../components/tasks/ScenarioTask';
import { CritiqueTask } from '../../components/tasks/CritiqueTask';
import { SketchTask } from '../../components/tasks/SketchTask';

const STEPS = BLANK_SIGNAL_TASKS.map((t, i) => ({ id: i + 1, label: t.type.charAt(0).toUpperCase() + t.type.slice(1) }));

const TASK_TYPE_LABELS: Record<string, string> = {
  ranking: 'Prioritisation task',
  tradeoff: 'Trade-off choice',
  scenario: 'Scenario response',
  critique: 'Critique task',
  sketch: 'Sketch task',
};

export function SignalTaskFlow() {
  const [currentTask, setCurrentTask] = useState(0);
  const [responses, setResponses] = useState<Record<string, unknown>>({});
  const navigate = useNavigate();
  const task = BLANK_SIGNAL_TASKS[currentTask];
  const isLast = currentTask === BLANK_SIGNAL_TASKS.length - 1;

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

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8 overflow-x-auto">
        <StepIndicator steps={STEPS} currentStep={currentTask + 1} />
      </div>

      <div className="mb-2">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
          {TASK_TYPE_LABELS[task.type] || task.type}
        </span>
        {task.timeLimit && (
          <span className="ml-3 inline-flex items-center gap-1 text-xs text-gray-400">
            <Clock size={11} />
            ~{task.timeLimit} min
          </span>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">{task.title}</h2>
      <p className="text-gray-500 leading-relaxed mb-8">{task.instructions}</p>

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
          <SketchTask onChange={(data) => handleResponse(data)} />
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Task {currentTask + 1} of {BLANK_SIGNAL_TASKS.length}
        </p>
        <button
          onClick={handleNext}
          disabled={!hasResponse && task.type !== 'sketch'}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLast ? 'Complete profile' : 'Next task'}
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

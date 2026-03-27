import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, X, ArrowRight, CheckCircle } from 'lucide-react';
import { useCandidateSession } from '../../context/CandidateSessionContext';
import { ALEX_MORGAN_IMPORT } from '../../data/linkedinSeed';

type UploadState = 'idle' | 'reading' | 'done';

const READING_STEPS = [
  { label: 'Reading document', duration: 700 },
  { label: 'Extracting name and headline', duration: 600 },
  { label: 'Identifying recent roles', duration: 800 },
  { label: 'Parsing dates and descriptions', duration: 700 },
];

export function CVUpload() {
  const navigate = useNavigate();
  const { setAuthProvider, setImportedProfile } = useCandidateSession();
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setFileName(file.name);
    setUploadState('reading');
    setCompletedSteps([]);
    setActiveStep(0);

    let elapsed = 0;
    READING_STEPS.forEach((step, index) => {
      setTimeout(() => setActiveStep(index), elapsed);
      elapsed += step.duration;
      setTimeout(() => setCompletedSteps((prev) => [...prev, index]), elapsed);
    });

    setTimeout(() => {
      setUploadState('done');
      setAuthProvider('email');
      setImportedProfile(ALEX_MORGAN_IMPORT);
    }, elapsed + 400);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">CV upload</p>
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">
        Upload your CV or résumé
      </h1>
      <p className="text-gray-500 leading-relaxed mb-10">
        We'll extract the basics — name, headline, and recent roles — so you don't have to retype them. You can edit everything before continuing.
      </p>

      {uploadState === 'idle' && (
        <>
          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => inputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="sr-only"
              onChange={handleInput}
            />
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload size={22} className="text-gray-400" />
            </div>
            <p className="font-medium text-gray-700 mb-1">Drop your CV here, or click to browse</p>
            <p className="text-sm text-gray-400">PDF, Word, or plain text — any format works</p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">What we extract</p>
            <ul className="space-y-1.5 text-xs text-gray-500">
              {['Name and contact headline', 'Summary or profile text if present', 'Up to 3 recent roles with dates'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-3">
              Everything is editable before you continue. Nothing is locked in.
            </p>
          </div>
        </>
      )}

      {uploadState === 'reading' && fileName && (
        <div className="space-y-6">
          {/* File badge */}
          <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl">
            <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-indigo-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{fileName}</p>
              <p className="text-xs text-gray-400">Reading…</p>
            </div>
          </div>

          {/* Progress */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((completedSteps.length / READING_STEPS.length) * 100)}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {READING_STEPS.map((step, index) => {
              const isDone = completedSteps.includes(index);
              const isActive = activeStep === index && !isDone;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isDone ? 'bg-emerald-500' : isActive ? 'bg-indigo-100 border-2 border-indigo-400' : 'bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle size={11} className="text-white" />
                    ) : isActive ? (
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    ) : null}
                  </div>
                  <span className={`text-sm transition-colors ${isDone ? 'text-gray-400 line-through' : isActive ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {uploadState === 'done' && (
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <CheckCircle size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-800 mb-1">CV read successfully</p>
              <p className="text-sm text-emerald-700 leading-relaxed">
                We've extracted your name, headline, summary, and recent roles. Review and edit them on the next screen.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => { setUploadState('idle'); setFileName(null); setCompletedSteps([]); }}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={13} />
              Upload a different file
            </button>
            <button
              onClick={() => navigate('/candidate/review-import')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Review extracted profile
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

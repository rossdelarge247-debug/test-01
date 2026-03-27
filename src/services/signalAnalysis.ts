import Anthropic from '@anthropic-ai/sdk';

export interface SignalAnalysis {
  score: number;       // 1–10
  tags: string[];      // 2–3 short phrases
  rationale: string;   // one sentence
  standoutQuote: string; // verbatim extract from response
  dimensionLabel: string;
}

const DIMENSION_LABELS: Record<string, string> = {
  'stakeholder-sensitivity': 'Stakeholder sensitivity',
  'structured-thinking':     'Structured thinking',
  'collaboration-preference':'Collaboration preference',
  'ambiguity-comfort':       'Ambiguity comfort',
  'execution-bias':          'Execution bias',
  'systems-thinking':        'Systems thinking',
};

export async function scoreResponse(params: {
  taskTitle: string;
  taskInstructions: string;
  candidateResponse: string;
  critiqueArtifact?: string;
  dimension: string;
}): Promise<SignalAnalysis> {
  const { taskTitle, taskInstructions, candidateResponse, critiqueArtifact, dimension } = params;

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('VITE_ANTHROPIC_API_KEY not set');

  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  const artifactSection = critiqueArtifact
    ? `\n\nThe artifact being critiqued:\n${critiqueArtifact}\n`
    : '';

  const dimensionLabel = DIMENSION_LABELS[dimension] ?? dimension;

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 512,
    system:
      'You are a hiring signal analyst. You read candidate responses to structured tasks and extract precise signals about how they think and work. Be evidence-based. Return only valid JSON with no prose outside the JSON object.',
    messages: [
      {
        role: 'user',
        content: `Task: "${taskTitle}"
Instructions given to candidate: "${taskInstructions}"${artifactSection}

Dimension being measured: ${dimensionLabel}

Candidate's response:
"${candidateResponse}"

Analyse this response and return JSON with exactly these fields:
{
  "score": <integer 1-10, how strongly this response signals the dimension>,
  "tags": [<2-3 short phrases, 3-5 words each, capturing the candidate's approach>],
  "rationale": "<one sentence explaining what the score reflects and why>",
  "standoutQuote": "<the single most telling verbatim phrase from the response, 5-20 words>"
}`,
      },
    ],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in model response');

  const parsed = JSON.parse(jsonMatch[0]);
  return {
    score: Math.min(10, Math.max(1, Math.round(Number(parsed.score) || 5))),
    tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 3) : [],
    rationale: String(parsed.rationale || ''),
    standoutQuote: String(parsed.standoutQuote || ''),
    dimensionLabel,
  };
}

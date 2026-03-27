import type { FitAnalysis } from '../types';

export const FIT_ANALYSES: FitAnalysis[] = [
  {
    id: 'fa1',
    signalProfileId: 'sp1',
    roleFitPackId: 'rfp1',
    overallFitSummary:
      "Maya's profile aligns strongly with the Lumio Senior Service Designer role. Her comfort with ambiguity, systems-level thinking, and preference for building shared understanding before acting maps well to what Lumio needs. The main tension is pace — Maya's instinct to align before moving may conflict with the role's fast, commercially-driven environment.",
    fitStatus: 'strong-alignment',
    alignmentScore: 82,
    strengths: [
      {
        dimension: 'Ambiguity Comfort',
        headline: 'High comfort with undefined problem spaces',
        detail:
          "Maya consistently shows she can operate without a defined brief. Her ranking prioritised shared understanding over visible output, and her critique response directly challenged the tendency to jump to deliverables without diagnosis.",
        evidenceSnippet:
          "The biggest issue is that the brief skips entirely over the question of why users are dropping off.",
      },
      {
        dimension: 'Structured Thinking',
        headline: 'Strong diagnostic instinct',
        detail:
          "Her responses demonstrate a clear preference for understanding the system before intervening. This matches Lumio's need to map service journeys that currently 'sit in people's heads'.",
        evidenceSnippet:
          "I'd frame it as risk reduction, not delay.",
      },
      {
        dimension: 'Stakeholder Sensitivity',
        headline: 'Skilled at navigating without authority',
        detail:
          "Maya's stakeholder scenario response shows she can hold position under pressure while maintaining relationship. She uses reframing — 'risk reduction, not delay' — as a tool.",
        evidenceSnippet:
          "I wouldn't pretend we have more certainty than we do.",
      },
    ],
    tensions: [
      {
        dimension: 'Execution Bias',
        headline: 'Alignment-first orientation may create pace tension',
        detail:
          "Lumio runs fast and makes decisions quickly with incomplete information. Maya's strong preference for alignment before action could slow down a team that expects to do and review rather than plan and decide. This isn't a fatal mismatch — but it's a real one worth exploring.",
        evidenceSnippet:
          "Her top ranked action was to facilitate shared priority alignment — before even mapping the current state.",
      },
      {
        dimension: 'Autonomy Expected',
        headline: 'May need more support structure than the role offers',
        detail:
          "The role requires someone who can operate independently without design team or research ops support. Maya's profile shows high capability but her responses hint at a preference for collaborative working that could be constrained in this lean environment.",
      },
    ],
    evidenceLinks: [
      {
        taskId: 'sp1-t3',
        dimension: 'stakeholder-sensitivity',
        snippet: "I'd frame it as risk reduction, not delay.",
        relevance: 'Demonstrates ability to push back constructively on senior stakeholders',
      },
      {
        taskId: 'sp1-t4',
        dimension: 'structured-thinking',
        snippet: "The biggest issue is that the brief skips entirely over the question of why users are dropping off.",
        relevance: 'Shows diagnosis-before-solution thinking aligned with role needs',
      },
      {
        taskId: 'sp1-t1',
        dimension: 'collaboration-preference',
        snippet: 'Ranked shared priority facilitation as first action in crisis scenario',
        relevance: 'Reveals alignment-first instinct — relevant to pace tension in this role',
      },
    ],
    interviewPrompts: [
      "Tell me about a time you had to move quickly on a project you felt was under-researched. How did you decide what was 'good enough' to proceed?",
      "Walk me through an example of building organisational understanding alongside outputs — how did you manage the balance?",
      "What conditions do you need to do your best work? What tends to get in the way?",
      "Describe a situation where you influenced a decision without having the authority to make it.",
    ],
  },
  {
    id: 'fa2',
    signalProfileId: 'sp2',
    roleFitPackId: 'rfp1',
    overallFitSummary:
      "James brings strong commercial awareness and a discovery-led orientation that would be valued at Lumio. However, his profile is primarily a product one — his instincts are around hypothesis testing and commercial viability rather than service design and organisational mapping. The fit is promising but the role may feel too systems-and-process-oriented for his natural strengths.",
    fitStatus: 'promising-fit',
    alignmentScore: 64,
    strengths: [
      {
        dimension: 'Ambiguity Comfort',
        headline: 'Exploration-first mindset',
        detail:
          "James selected 'exploration over standardisation' as his natural trade-off, and his responses show comfort with not having the answer at the start. This aligns with Lumio's high-ambiguity environment.",
        evidenceSnippet: "I'd push back directly but constructively.",
      },
      {
        dimension: 'Stakeholder Sensitivity',
        headline: 'Direct communicator who manages upwards well',
        detail:
          "His stakeholder scenario response shows he can challenge up while proposing constructive alternatives. His framing — 'does committing this week change the outcome or just the appearance of progress?' — is sharp.",
        evidenceSnippet:
          "I'd ask what decision we're actually trying to make.",
      },
    ],
    tensions: [
      {
        dimension: 'Structured Thinking (Service Systems)',
        headline: 'Product PM instincts may not translate to service design',
        detail:
          "James's critique and scenario responses reveal strong product thinking — problem framing, outcome focus, assumption testing. But the service design role requires different kinds of structured thinking: service journey mapping, cross-functional facilitation, and building shared organisational models. These aren't the same muscle.",
        evidenceSnippet:
          "His critique focused on metric quality and problem definition — strong product instincts, but the service design brief needed a different lens.",
      },
      {
        dimension: 'Collaboration Preference',
        headline: 'Individual diagnostic style may not suit high-collaboration environment',
        detail:
          "James's ranking prioritised mapping the current state and meeting stakeholders before any collective facilitation. In a highly collaborative role, this independent diagnostic approach may need to adapt.",
      },
    ],
    evidenceLinks: [
      {
        taskId: 'sp2-t3',
        dimension: 'stakeholder-sensitivity',
        snippet: "I'd ask what decision we're actually trying to make.",
        relevance: 'Sharp stakeholder challenge — directly relevant to navigating Lumio\'s fast-decision culture',
      },
      {
        taskId: 'sp2-t4',
        dimension: 'structured-thinking',
        snippet: "We don't know what problem the dashboard is solving or for whom.",
        relevance: 'Strong problem-framing instinct — product-oriented rather than service-oriented',
      },
    ],
    interviewPrompts: [
      "Have you done work that felt more like service design than product management — mapping end-to-end experiences across teams? What was that like?",
      "How do you think about the difference between product discovery and service mapping? Where do they overlap for you?",
      "Tell me about a time you had to build shared understanding across a complex organisation. What made it hard?",
    ],
  },
  {
    id: 'fa3',
    signalProfileId: 'sp3',
    roleFitPackId: 'rfp2',
    overallFitSummary:
      "Priya's profile is a strong fit for the Meridian Operations Transformation Lead role. Her execution orientation, structured diagnostic approach, and experience navigating politically complex organisations map well to what Meridian needs. The main area to probe is whether she can calibrate her depth of analysis to the pace the role requires — and whether she's worked with similar governance structures before.",
    fitStatus: 'strong-alignment',
    alignmentScore: 88,
    strengths: [
      {
        dimension: 'Execution Bias',
        headline: 'Strong delivery orientation with clear early-progress instinct',
        detail:
          "Priya selected 'speed over polish' as her trade-off and her critique response showed she can identify the real bottleneck quickly and move to a practical redesign. This matches Meridian's need for visible transformation progress early.",
        evidenceSnippet:
          "Everything depends on the team lead as a human routing layer — which is a single point of failure.",
      },
      {
        dimension: 'Structured Thinking',
        headline: 'Diagnostic and framework-building capability',
        detail:
          "Priya's ranking response showed a deliberate evidence-gathering approach before action. Her critique identified a systemic problem and proposed a structural fix — not just a process patch. This is the kind of thinking Meridian needs for transformation work.",
        evidenceSnippet:
          "I'd look at how to create lightweight shared visibility in real time.",
      },
      {
        dimension: 'Stakeholder Sensitivity',
        headline: 'Understands urgency drivers and manages upwards',
        detail:
          "Her stakeholder scenario response — asking whether urgency is 'a real constraint or a habit of premature closure' — shows she can read political dynamics and manage upwards with credibility.",
        evidenceSnippet:
          "I'd first try to understand what's actually driving the urgency.",
      },
    ],
    tensions: [
      {
        dimension: 'Ambiguity Comfort (Process Maturity)',
        headline: 'May over-engineer in lower-maturity environments',
        detail:
          "Priya's profile shows a preference for structured frameworks — which is a strength, but could create tension in Meridian's evolving environment if she tries to impose too much structure before the organisation is ready. The role requires someone who can flex between structured thinking and practical improvisation.",
      },
      {
        dimension: 'Autonomy Expected',
        headline: 'Needs credible leadership sponsorship',
        detail:
          "Her responses suggest she's most effective when working with visible executive support. Meridian's governance structure provides this — but it's worth understanding how she manages when that support is inconsistent or slow to materialise.",
      },
    ],
    evidenceLinks: [
      {
        taskId: 'sp3-t4',
        dimension: 'execution-bias',
        snippet: "Everything depends on the team lead as a human routing layer — which is a single point of failure and a bottleneck to throughput.",
        relevance: 'Rapid identification of the systemic issue — strong diagnostic instinct for operations transformation',
      },
      {
        taskId: 'sp3-t3',
        dimension: 'stakeholder-sensitivity',
        snippet: "I'd first try to understand what's actually driving the urgency — is this a real constraint or a habit of premature closure?",
        relevance: 'Political intelligence and ability to manage upwards with credibility',
      },
      {
        taskId: 'sp3-t1',
        dimension: 'structured-thinking',
        snippet: 'Ranked evidence review first, then diagnosis — before any stakeholder action',
        relevance: 'Evidence-gathering orientation before intervention — aligned with Meridian\'s need for credible diagnosis',
      },
    ],
    interviewPrompts: [
      "Walk me through a transformation programme you led where the organisational readiness was lower than expected. How did you adapt?",
      "Tell me about navigating a politically complex environment — how did you identify the formal and informal routes to getting decisions made?",
      "When have you had to slow down a piece of work because you were moving faster than the organisation could absorb?",
      "How do you balance building a robust diagnosis with the expectation to show progress quickly?",
    ],
  },
];

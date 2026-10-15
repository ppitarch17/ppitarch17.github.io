export const phases = [
  { id: 'req', name: 'Requirements', text: 'Sit with the client and work out what’s actually needed.' },
  { id: 'design', name: 'Design', text: 'Flows and UI, mocked up in Figma.' },
  { id: 'build', name: 'Build', text: 'Frontend first, backend when the project needs it.' },
  { id: 'ship', name: 'Ship', text: 'Deploy and test on the real venue, screen or bike.' },
  { id: 'run', name: 'Maintain', text: 'Fix, improve and keep it running.' },
] as const;

export type PhaseId = (typeof phases)[number]['id'];

// TODO(Pablo): check which phases you covered on each project.
export const phaseProjects: { name: string; phases: PhaseId[] }[] = [
  { name: 'Multi-screen platform', phases: ['req', 'design', 'build', 'ship', 'run'] },
  { name: 'Magnetis website', phases: ['req', 'design', 'build', 'ship', 'run'] },
  { name: 'UJIERT telemetry', phases: ['req', 'design', 'build', 'ship'] },
  { name: 'Tourism map CMS', phases: ['req', 'design', 'build', 'ship'] },
];

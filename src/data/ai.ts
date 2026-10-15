// One everyday task, followed from start to finish. TODO(Pablo): adjust to match how you work.
export const aiExample = 'Add search to a list of screens';

export const aiSteps: { who: 'me' | 'claude'; text: string }[] = [
  { who: 'me', text: 'I explain the goal: staff need to find a screen by its name.' },
  { who: 'claude', text: 'Claude reads the project and proposes a plan: which files change, and how.' },
  { who: 'me', text: 'I check the plan fits the architecture, adjust it and approve it.' },
  { who: 'claude', text: 'Claude writes the code and the tests.' },
  { who: 'me', text: 'I read every line, try it on the real thing and ship it.' },
];

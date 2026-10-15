export interface Tool {
  name: string;
  icon: string;
  note: string;
  invert?: boolean;
}

export const tools: Tool[] = [
  { name: 'Angular', icon: '/icons/logo-angular.svg', note: 'I use Angular to build web applications with TypeScript, HTML and CSS.', invert: true },
  { name: 'TypeScript', icon: '/icons/logo-typescript.svg', note: 'TypeScript helps me write less error-prone code.', invert: true },
  { name: 'Python', icon: '/icons/logo-python.svg', note: 'Backends, data analysis tools and automation scripts.', invert: true },
  { name: 'Tailwind', icon: '/icons/logo-tailwind.svg', note: 'Custom designs quickly, without leaving my code.', invert: true },
  { name: 'Firebase', icon: '/icons/logo-firebase.svg', note: 'Auth, databases and cloud functions for my web apps.', invert: true },
  { name: 'VS Code', icon: '/icons/logo-visual-studio-code.svg', note: 'My primary editor for writing and debugging code.', invert: true },
  { name: 'GitHub', icon: '/icons/logo-github.svg', note: 'Where my code lives and where I collaborate.', invert: true },
  { name: 'Figma', icon: '/icons/logo-figma.svg', note: 'Where I design and collaborate on UI.', invert: true },
  { name: 'Photoshop', icon: '/icons/logo-photoshop.svg', note: 'Custom designs and photo editing.', invert: true },
  { name: 'Notion', icon: '/icons/notion.png', note: 'Tasks, notes and projects, all organised.' },
];

export const skillGroups = [
  { label: 'Frontend', items: ['Angular', 'TypeScript', 'RxJS', 'PWA', 'HTML / CSS', 'Tailwind', 'Astro', 'GSAP'] },
  { label: 'Backend & data', items: ['Python', 'Firebase', 'REST APIs', 'Telemetry analysis', 'Test automation'] },
  { label: 'AI', items: ['Claude Code', 'LLM APIs', 'Agents', 'MCP', 'Prompt engineering'] },
  { label: 'Craft', items: ['Figma', 'Photoshop', 'Drone video', 'Photography', 'Notion'] },
];

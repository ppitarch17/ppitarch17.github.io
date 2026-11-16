import type { Lang } from '../i18n';

export interface Tool {
  name: string;
  icon: string;
  note: Record<Lang, string>;
  invert?: boolean;
}

export const tools: Tool[] = [
  { name: 'Angular', icon: '/icons/logo-angular.svg', note: { en: 'I use Angular to build web applications with TypeScript, HTML and CSS.', es: 'Uso Angular para crear aplicaciones web con TypeScript, HTML y CSS.' }, invert: true },
  { name: 'TypeScript', icon: '/icons/logo-typescript.svg', note: { en: 'TypeScript helps me write less error-prone code.', es: 'TypeScript me ayuda a escribir código con menos errores.' }, invert: true },
  { name: 'Python', icon: '/icons/logo-python.svg', note: { en: 'Backends, data analysis tools and automation scripts.', es: 'Backends, herramientas de análisis de datos y scripts de automatización.' }, invert: true },
  { name: 'Tailwind', icon: '/icons/logo-tailwind.svg', note: { en: 'Custom designs quickly, without leaving my code.', es: 'Diseños a medida rápido, sin salir del código.' }, invert: true },
  { name: 'Firebase', icon: '/icons/logo-firebase.svg', note: { en: 'Auth, databases and cloud functions for my web apps.', es: 'Autenticación, bases de datos y funciones en la nube para mis apps web.' }, invert: true },
  { name: 'VS Code', icon: '/icons/logo-visual-studio-code.svg', note: { en: 'My primary editor for writing and debugging code.', es: 'Mi editor principal para escribir y depurar código.' }, invert: true },
  { name: 'GitHub', icon: '/icons/logo-github.svg', note: { en: 'Where my code lives and where I collaborate.', es: 'Donde vive mi código y donde colaboro.' }, invert: true },
  { name: 'Figma', icon: '/icons/logo-figma.svg', note: { en: 'Where I design and collaborate on UI.', es: 'Donde diseño interfaces y colaboro en ellas.' }, invert: true },
  { name: 'Photoshop', icon: '/icons/logo-photoshop.svg', note: { en: 'Custom designs and photo editing.', es: 'Diseños a medida y edición de fotos.' }, invert: true },
  { name: 'Notion', icon: '/icons/notion.png', note: { en: 'Tasks, notes and projects, all organised.', es: 'Tareas, notas y proyectos, todo organizado.' } },
];

export const skillGroups = [
  { label: 'Frontend', items: ['Angular', 'TypeScript', 'RxJS', 'PWA', 'HTML / CSS', 'Tailwind', 'Astro', 'GSAP'] },
  { label: 'Backend & data', items: ['Python', 'Firebase', 'REST APIs', 'Telemetry analysis', 'Test automation'] },
  { label: 'AI', items: ['Claude Code', 'LLM APIs', 'Agents', 'Agent orchestration', 'Local LLMs', 'MCP', 'Prompt engineering'] },
  { label: 'Craft', items: ['Figma', 'Photoshop', 'Drone video', 'Photography', 'Notion'] },
];

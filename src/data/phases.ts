import type { Lang } from '../i18n';

export const phaseIds = ['req', 'design', 'build', 'ship', 'run'] as const;
export type PhaseId = (typeof phaseIds)[number];

const en: { id: PhaseId; name: string; text: string }[] = [
  { id: 'req', name: 'Requirements', text: 'Sit with the client and work out what’s actually needed.' },
  { id: 'design', name: 'Design', text: 'Flows and UI, mocked up in Figma.' },
  { id: 'build', name: 'Build', text: 'Frontend first, backend when the project needs it.' },
  { id: 'ship', name: 'Ship', text: 'Deploy and test on the real venue, screen or bike.' },
  { id: 'run', name: 'Maintain', text: 'Fix, improve and keep it running.' },
];

const es: typeof en = [
  { id: 'req', name: 'Requisitos', text: 'Sentarme con el cliente y averiguar qué hace falta de verdad.' },
  { id: 'design', name: 'Diseño', text: 'Flujos e interfaz, maquetados en Figma.' },
  { id: 'build', name: 'Desarrollo', text: 'Primero el frontend, el backend cuando el proyecto lo pide.' },
  { id: 'ship', name: 'Entrega', text: 'Desplegar y probar en el recinto, la pantalla o la moto reales.' },
  { id: 'run', name: 'Mantenimiento', text: 'Corregir, mejorar y mantenerlo en marcha.' },
];

export const phases: Record<Lang, typeof en> = { en, es };

// TODO(Pablo): check which phases you covered on each project.
export const phaseProjects: { name: Record<Lang, string>; phases: PhaseId[] }[] = [
  { name: { en: 'Multi-screen platform', es: 'Plataforma multipantalla' }, phases: ['req', 'design', 'build', 'ship', 'run'] },
  { name: { en: 'Magnetis website', es: 'Web de Magnetis' }, phases: ['req', 'design', 'build', 'ship', 'run'] },
  { name: { en: 'UJIERT telemetry', es: 'Telemetría UJIERT' }, phases: ['req', 'design', 'build', 'ship'] },
  { name: { en: 'Tourism map CMS', es: 'CMS de mapas turísticos' }, phases: ['req', 'design', 'build', 'ship'] },
];

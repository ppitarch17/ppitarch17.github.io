import type { Lang } from '../i18n';

export interface Role {
  period: string;
  title: string;
  org: string;
  place?: string;
  kind: 'work' | 'team' | 'education' | 'abroad';
  summary: string;
  highlights: string[];
  stack?: string[];
  current?: boolean;
  minor?: boolean; // older or less relevant: drawn smaller on the timeline
}

// Keep entries short: one-line summary, at most two highlights.
const en: Role[] = [
  {
    period: '2023 — Present',
    title: 'Frontend Developer',
    org: 'Amazing Up',
    kind: 'work',
    current: true,
    summary: 'Production Angular apps for public spaces.',
    highlights: [
      'A multi-screen content and playback platform: 200 screens across 5 sites, in historic venues and public transport stations, running unattended 24/7.',
      'An accessible map CMS for a city tourist office.',
    ],
    stack: ['Angular', 'TypeScript', 'PWA'],
  },
  {
    period: '2021 — Present',
    title: 'Freelance Web and AI Engineer',
    org: 'Magnetis Ingeniería',
    kind: 'work',
    current: true,
    summary: 'Part-time, as the only technical person at an engineering firm.',
    highlights: ['Designed, built and run their website in Angular.', 'A project and finance tracker with AI built in.'],
  },
  {
    period: '2023',
    title: 'Head of Telemetry',
    org: 'UJI Electric Racing Team',
    kind: 'team',
    summary: 'Built the telemetry and tuned the motor for MotoStudent VII.',
    highlights: ['🥇 Play-off Race, 🥈 MS1 Finals, 🥉 Red Bull MotoBoost InnoCall.'],
  },
  {
    period: '2022 — 2023',
    title: 'QA Automation Intern',
    org: 'IoTSens',
    kind: 'work',
    summary: 'Set up automated testing for an IoT monitoring platform.',
    highlights: [],
  },
  {
    period: '2022',
    title: 'Exchange semester',
    org: 'Sejong University, Seoul',
    kind: 'abroad',
    summary: 'A semester among students from all over the world. It taught me how differently people approach work and life.',
    highlights: [],
  },
  {
    period: '2019 — 2023',
    title: 'BSc Computer Engineering',
    org: 'Universitat Jaume I',
    kind: 'education',
    summary: 'Specialised in software development.',
    highlights: [],
  },
  {
    period: '2018 — 2019',
    title: 'Tennis Instructor',
    org: 'Ripotenis, Benicàssim',
    kind: 'work',
    minor: true,
    summary: 'Taught tennis to kids and teenagers.',
    highlights: [],
  },
  {
    period: '2017 — 2019',
    title: 'IB Diploma',
    org: 'International Baccalaureate', // TODO(Pablo): add your school's name
    kind: 'education',
    minor: true,
    summary: 'Completed the International Baccalaureate Diploma Programme.',
    highlights: [],
  },
];

const es: Role[] = [
  {
    period: '2023 — Actualidad',
    title: 'Desarrollador frontend',
    org: 'Amazing Up',
    kind: 'work',
    current: true,
    summary: 'Aplicaciones Angular en producción para espacios públicos.',
    highlights: [
      'Una plataforma de contenidos y reproducción multipantalla: 200 pantallas en 5 sedes, en recintos históricos y estaciones de transporte público, funcionando 24/7 sin supervisión.',
      'Un CMS de mapas accesible para la oficina de turismo de una ciudad.',
    ],
    stack: ['Angular', 'TypeScript', 'PWA'],
  },
  {
    period: '2021 — Actualidad',
    title: 'Ingeniero web y de IA freelance',
    org: 'Magnetis Ingeniería',
    kind: 'work',
    current: true,
    summary: 'A tiempo parcial, como única persona técnica de una ingeniería.',
    highlights: ['Diseñé, desarrollé y mantengo su web en Angular.', 'Un gestor de proyectos y finanzas con IA integrada.'],
  },
  {
    period: '2023',
    title: 'Jefe de telemetría',
    org: 'UJI Electric Racing Team',
    kind: 'team',
    summary: 'Construí la telemetría y ajusté el motor para MotoStudent VII.',
    highlights: ['🥇 Play-off Race, 🥈 MS1 Finals, 🥉 Red Bull MotoBoost InnoCall.'],
  },
  {
    period: '2022 — 2023',
    title: 'Becario de automatización QA',
    org: 'IoTSens',
    kind: 'work',
    summary: 'Monté las pruebas automáticas de una plataforma de monitorización IoT.',
    highlights: [],
  },
  {
    period: '2022',
    title: 'Semestre de intercambio',
    org: 'Sejong University, Seúl',
    kind: 'abroad',
    summary: 'Un semestre entre estudiantes de todo el mundo. Me enseñó lo distinto que cada uno enfoca el trabajo y la vida.',
    highlights: [],
  },
  {
    period: '2019 — 2023',
    title: 'Grado en Ingeniería Informática',
    org: 'Universitat Jaume I',
    kind: 'education',
    summary: 'Especializado en desarrollo de software.',
    highlights: [],
  },
  {
    period: '2018 — 2019',
    title: 'Monitor de tenis',
    org: 'Ripotenis, Benicàssim',
    kind: 'work',
    minor: true,
    summary: 'Di clases de tenis a niños y adolescentes.',
    highlights: [],
  },
  {
    period: '2017 — 2019',
    title: 'Bachillerato Internacional',
    org: 'International Baccalaureate',
    kind: 'education',
    minor: true,
    summary: 'Completé el Programa del Diploma del Bachillerato Internacional.',
    highlights: [],
  },
];

export const experience: Record<Lang, Role[]> = { en, es };

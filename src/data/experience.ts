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
}

// Keep entries short: one-line summary, at most two highlights.
export const experience: Role[] = [
  {
    period: '2023 — Present',
    title: 'Frontend Developer',
    org: 'Amazing Up',
    kind: 'work',
    current: true,
    summary: 'Production Angular apps for public spaces.',
    highlights: [
      'GEMS: synced multi-screen playback, running in the Royal Palace and Mallorca’s metro.',
      'SARA: accessible map CMS for the Valladolid tourist office.',
    ],
    stack: ['Angular', 'TypeScript', 'PWA'],
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
    summary: 'Studied with people from all over the world.',
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
    summary: 'Taught tennis to kids and teenagers.',
    highlights: [],
  },
  {
    period: '2017 — 2019',
    title: 'IB Diploma',
    org: 'International Baccalaureate', // TODO(Pablo): add your school's name
    kind: 'education',
    summary: 'Completed the International Baccalaureate Diploma Programme.',
    highlights: [],
  },
];

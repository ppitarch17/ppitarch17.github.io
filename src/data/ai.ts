import type { Lang } from '../i18n';

// The agent loop shown in the diagram. `who` colours the node: a person (red), the agent (blue) or neither.
export interface LoopNode {
  title: string;
  who: 'human' | 'agent' | 'none';
}

interface Loop {
  label: string;
  nodes: LoopNode[]; // Goal, Plan, Act, Observe, Human checks, Done
}

export const agentLoop: Record<Lang, Loop> = {
  en: {
    label: 'Diagram of an agent loop: goal, plan, act, observe, back to plan until finished, then a human checks it and it is done.',
    nodes: [
      { title: 'Goal', who: 'human' },
      { title: 'Plan', who: 'agent' },
      { title: 'Act', who: 'agent' },
      { title: 'Observe', who: 'agent' },
      { title: 'Human checks', who: 'human' },
      { title: 'Done', who: 'none' },
    ],
  },
  es: {
    label: 'Diagrama de un bucle de agente: objetivo, plan, actuar, observar, vuelta al plan hasta terminar, revisión humana y hecho.',
    nodes: [
      { title: 'Objetivo', who: 'human' },
      { title: 'Plan', who: 'agent' },
      { title: 'Actuar', who: 'agent' },
      { title: 'Observar', who: 'agent' },
      { title: 'Revisión', who: 'human' },
      { title: 'Hecho', who: 'none' },
    ],
  },
};

export interface AiItem {
  title: string;
  text: string;
  link?: { href: string; label: string };
}

// TODO(Pablo): confirm runtime, models and hardware for the local AI item. Wording is kept generic on purpose.
export const aiItems: Record<Lang, AiItem[]> = {
  en: [
    { title: 'Agents', text: 'Orchestrated agents with specialised sub-agents.' },
    { title: 'Local AI', text: 'Open-weight models on my own server.' },
    { title: 'AI inside systems', text: 'MCP servers, voice input and live summaries.', link: { href: '#proyecta', label: 'See voice input' } },
  ],
  es: [
    { title: 'Agentes', text: 'Agentes orquestados con subagentes especializados.' },
    { title: 'IA local', text: 'Modelos de pesos abiertos en mi propio servidor.' },
    { title: 'IA dentro de sistemas', text: 'Servidores MCP, entrada por voz y resúmenes en vivo.', link: { href: '#proyecta', label: 'Ver la entrada por voz' } },
  ],
};

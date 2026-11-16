import type { Lang } from '../i18n';

// A step in the orchestration diagram. `who` colours the node: a person (red) or an agent (blue).
export interface PipelineNode {
  title: string;
  who: 'human' | 'agent' | 'none';
}

interface Pipeline {
  label: string;
  nodes: PipelineNode[]; // Brief, Orchestrator, Explorer, Coder, Reviewer, My check
  roles: { title: string; text: string }[]; // one line per agent
  tiersLabel: string;
  tiers: { name: string; text: string }[]; // coder model by risk
}

export const pipeline: Record<Lang, Pipeline> = {
  en: {
    label:
      'Diagram of how I split work between AI agents: I write the brief, an orchestrator plans it, an explorer reads the code, a coder writes the change, a reviewer checks the diff and sends it back if needed, and I check the result.',
    nodes: [
      { title: 'Brief', who: 'human' },
      { title: 'Orchestrator', who: 'agent' },
      { title: 'Explorer', who: 'agent' },
      { title: 'Coder', who: 'agent' },
      { title: 'Reviewer', who: 'agent' },
      { title: 'My check', who: 'human' },
    ],
    roles: [
      { title: 'Orchestrator', text: 'Plans the work and splits it into steps.' },
      { title: 'Explorer', text: 'Reads unfamiliar code before anything changes.' },
      { title: 'Coder', text: 'Writes the change, on a model matched to the risk.' },
      { title: 'Reviewer', text: 'Checks the real diff against the task. If it finds problems, the task is retried one model up.' },
    ],
    tiersLabel: 'Model by risk',
    tiers: [
      { name: 'Haiku', text: 'renames, boilerplate, config' },
      { name: 'Sonnet', text: 'features, refactors, known bugs' },
      { name: 'Opus', text: 'auth, payments, data migrations' },
    ],
  },
  es: {
    label:
      'Diagrama de cómo reparto el trabajo entre agentes de IA: escribo el encargo, un orquestador lo planifica, un explorador lee el código, un programador escribe el cambio, un revisor comprueba el diff y lo devuelve si hace falta, y yo reviso el resultado.',
    nodes: [
      { title: 'Encargo', who: 'human' },
      { title: 'Orquestador', who: 'agent' },
      { title: 'Explorador', who: 'agent' },
      { title: 'Programador', who: 'agent' },
      { title: 'Revisor', who: 'agent' },
      { title: 'Mi revisión', who: 'human' },
    ],
    roles: [
      { title: 'Orquestador', text: 'Planifica el trabajo y lo divide en pasos.' },
      { title: 'Explorador', text: 'Lee el código desconocido antes de cambiar nada.' },
      { title: 'Programador', text: 'Escribe el cambio, con un modelo acorde al riesgo.' },
      { title: 'Revisor', text: 'Compara el diff real con la tarea. Si encuentra problemas, se reintenta con un modelo superior.' },
    ],
    tiersLabel: 'Modelo según el riesgo',
    tiers: [
      { name: 'Haiku', text: 'renombrados, plantillas, configuración' },
      { name: 'Sonnet', text: 'funcionalidades, refactors, bugs conocidos' },
      { name: 'Opus', text: 'autenticación, pagos, migraciones de datos' },
    ],
  },
};

// A run of text in the example line; `code` renders it in monospace.
interface Seg {
  t: string;
  code?: boolean;
}

interface Mcp {
  title: string;
  text: string;
  tools: string[];
  more: string;
  exampleLabel: string;
  example: Seg[];
  link: { href: string; label: string };
}

interface Local {
  title: string;
  text: string;
}

const tools = [
  'list_projects',
  'get_budget',
  'create_invoice',
  'create_project_from_budget',
  'convert_lead',
  'get_analytics',
  'get_tasks_summary',
  'update_task',
];

export const mcp: Record<Lang, Mcp> = {
  en: {
    title: 'An MCP server for the manager',
    text: "Claude reads and writes the firm's projects, quotes, invoices and tasks through 34 tools.",
    tools,
    more: 'and 26 more',
    exampleLabel: 'For example:',
    example: [
      { t: '“Add the new client, quote the job and open a project from it” runs ' },
      { t: 'create_client', code: true },
      { t: ', ' },
      { t: 'create_budget', code: true },
      { t: ' and ' },
      { t: 'create_project_from_budget', code: true },
      { t: '.' },
    ],
    link: { href: '#proyecta', label: 'See it in Proyecta' },
  },
  es: {
    title: 'Un servidor MCP para el gestor',
    text: 'Claude lee y escribe los proyectos, presupuestos, facturas y tareas de la empresa a través de 34 herramientas.',
    tools,
    more: 'y 26 más',
    exampleLabel: 'Por ejemplo:',
    example: [
      { t: '«Da de alta al cliente nuevo, presupuesta el trabajo y abre un proyecto a partir de él» ejecuta ' },
      { t: 'create_client', code: true },
      { t: ', ' },
      { t: 'create_budget', code: true },
      { t: ' y ' },
      { t: 'create_project_from_budget', code: true },
      { t: '.' },
    ],
    link: { href: '#proyecta', label: 'Verlo en Proyecta' },
  },
};

export const local: Record<Lang, Local> = {
  en: {
    title: 'Local, within limits',
    text: "I run Qwen on my own PC, the largest model it can handle. Small, but enough to learn where a local model is good enough and where it isn't.",
  },
  es: {
    title: 'En local, hasta donde llega mi PC',
    text: 'Uso Qwen en mi propio PC, el modelo más grande que aguanta. Es pequeño, pero suficiente para aprender dónde basta un modelo local y dónde no.',
  },
};

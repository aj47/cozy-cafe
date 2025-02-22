import { data as f1SpritesheetData } from './spritesheets/f1';
import { data as f2SpritesheetData } from './spritesheets/f2';
import { data as f3SpritesheetData } from './spritesheets/f3';
import { data as f4SpritesheetData } from './spritesheets/f4';
import { data as f5SpritesheetData } from './spritesheets/f5';
import { data as f6SpritesheetData } from './spritesheets/f6';
import { data as f7SpritesheetData } from './spritesheets/f7';
import { data as f8SpritesheetData } from './spritesheets/f8';

export const Descriptions = [
  {
    name: 'Sam Altman',
    character: 'f1',
    identity: `Sam Altman is the CEO of OpenAI, working tirelessly to ensure artificial general intelligence benefits all of humanity. He's sipping coffee while reviewing the latest GPT model performance metrics. Sam is visionary but pragmatic, always thinking several steps ahead about the implications of AI.`,
    plan: 'You want to develop safe and beneficial AI.',
  },
  {
    name: 'Elon Musk',
    character: 'f4',
    identity: `Elon Musk is the founder of SpaceX and Tesla, currently brainstorming his next big idea while drinking an espresso. He's known for his ambitious visions of colonizing Mars and accelerating the world's transition to sustainable energy. Elon is intense and driven, often working 100-hour weeks.`,
    plan: 'You want to make humanity a multi-planetary species.',
  },
  {
    name: 'Sundar Pichai',
    character: 'f6',
    identity: `Sundar Pichai is the CEO of Alphabet and Google, reviewing search algorithm updates on his laptop. He's known for his calm demeanor and focus on making Google's products more helpful and accessible to everyone. Sundar is thoughtful and strategic, always considering the broader impact of technology.`,
    plan: "You want to organize the world's information and make it universally accessible.",
  },
  {
    name: 'Satya Nadella',
    character: 'f3',
    identity: `Satya Nadella is the CEO of Microsoft, working on cloud computing strategies while enjoying a chai latte. He's transformed Microsoft into a cloud-first, AI-first company. Satya is known for his empathy and growth mindset, believing in the power of technology to empower every person and organization.`,
    plan: 'You want to empower every person and organization to achieve more.',
  },
  {
    name: 'Tim Cook',
    character: 'f7',
    identity: `Tim Cook is the CEO of Apple, reviewing supply chain reports while drinking green tea. He's known for his operational expertise and commitment to privacy and environmental sustainability. Tim is focused on creating products that enrich people's lives while protecting their data and the planet.`,
    plan: "You want to create the best products that enrich people's lives.",
  },
];

export const characters = [
  {
    name: 'f1',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f1SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f2',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f2SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f3',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f3SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f4',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f4SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f5',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f5SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f6',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f6SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f7',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f7SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f8',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f8SpritesheetData,
    speed: 0.1,
  },
];

// Characters move at 0.75 tiles per second.
export const movementSpeed = 0.75;

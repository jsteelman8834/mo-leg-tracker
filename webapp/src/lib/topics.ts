import type { Topic } from '@/types';

// Static topic definitions - these don't change and don't need to import the full graph
// This avoids bundling the entire 11MB graph.json just for topic lookups
export const TOPICS: Record<string, Topic> = {
  'taxes': {
    id: 'topic:taxes',
    name: 'Taxes & Budget',
    icon: '💰',
    description: 'Property tax, income tax, sales tax, state budget, and fees',
    keywords: [],
    color: 'bg-amber-100 text-amber-800',
  },
  'health': {
    id: 'topic:health',
    name: 'Health & Healthcare',
    icon: '🏥',
    description: 'Insurance coverage, hospitals, mental health, public health, and drugs',
    keywords: [],
    color: 'bg-red-100 text-red-800',
  },
  'education': {
    id: 'topic:education',
    name: 'Education',
    icon: '🎓',
    description: 'K-12 schools, higher education, school safety, teachers, and curriculum',
    keywords: [],
    color: 'bg-blue-100 text-blue-800',
  },
  'justice': {
    id: 'topic:justice',
    name: 'Crime & Justice',
    icon: '⚖️',
    description: 'Criminal law, sentencing, courts, corrections, and victims',
    keywords: [],
    color: 'bg-purple-100 text-purple-800',
  },
  'guns': {
    id: 'topic:guns',
    name: 'Guns & Firearms',
    icon: '🔫',
    description: 'Firearms, ammunition, concealed carry, and Second Amendment',
    keywords: [],
    color: 'bg-orange-100 text-orange-800',
  },
  'safety': {
    id: 'topic:safety',
    name: 'Public Safety',
    icon: '🚨',
    description: 'Police, fire, emergency services, and first responders',
    keywords: [],
    color: 'bg-red-100 text-red-800',
  },
  'housing': {
    id: 'topic:housing',
    name: 'Housing & Property',
    icon: '🏠',
    description: 'Real estate, homeowners, landlords, and property rights',
    keywords: [],
    color: 'bg-emerald-100 text-emerald-800',
  },
  'jobs': {
    id: 'topic:jobs',
    name: 'Jobs & Business',
    icon: '👷',
    description: 'Employment, workers comp, labor, and business regulations',
    keywords: [],
    color: 'bg-yellow-100 text-yellow-800',
  },
  'transportation': {
    id: 'topic:transportation',
    name: 'Transportation',
    icon: '🚗',
    description: 'Vehicles, roads, drivers licenses, and public transit',
    keywords: [],
    color: 'bg-slate-100 text-slate-800',
  },
  'agriculture': {
    id: 'topic:agriculture',
    name: 'Agriculture & Environment',
    icon: '🌾',
    description: 'Farming, natural resources, conservation, and wildlife',
    keywords: [],
    color: 'bg-green-100 text-green-800',
  },
  'voting': {
    id: 'topic:voting',
    name: 'Voting & Government',
    icon: '🗳️',
    description: 'Elections, voting, local government, and state agencies',
    keywords: [],
    color: 'bg-indigo-100 text-indigo-800',
  },
  'families': {
    id: 'topic:families',
    name: 'Families & Seniors',
    icon: '👨‍👩‍👧',
    description: 'Child welfare, adoption, parental rights, and aging',
    keywords: [],
    color: 'bg-pink-100 text-pink-800',
  },
  'rights': {
    id: 'topic:rights',
    name: 'Rights & Technology',
    icon: '🔒',
    description: 'Civil liberties, religious freedom, privacy, AI, and internet',
    keywords: [],
    color: 'bg-cyan-100 text-cyan-800',
  },
};

/**
 * Get topic by ID - lightweight lookup that doesn't require the full graph
 */
export function getTopicById(id: string): Topic | null {
  // Handle both "topic:taxes" and "taxes" format
  const normalizedId = id.startsWith('topic:') ? id.replace('topic:', '') : id;
  return TOPICS[normalizedId] || null;
}

/**
 * Get topic badges for a list of topic IDs
 */
export function getTopicBadges(topicIds: string[] | undefined, maxBadges: number = 2): Topic[] {
  if (!topicIds || topicIds.length === 0) return [];
  return topicIds
    .slice(0, maxBadges)
    .map((id) => getTopicById(id))
    .filter((t): t is Topic => t !== null);
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
  id: 1,
  date: "The Beginning",
  title: "The Confession",
  description: "Iss umar mai hojata hai, sorry but I like you — that's how it started.",
  },
  {
  id: 2,
  date: "A Night to Remember",
  title: "First Late Night Talk",
  description: "This was the first night we spent talking until dawn about our friend's wedding, little knowing that it would strengthen our bond in such a meaningful way.",
  },
  {
  id: 3,
  date: "A Moment Without Words",
  title: "The Balcony Glance",
  description: "Seeing you from the balcony and sharing a moment of eye contact felt like having an entire conversation without saying a single word. Sometimes, silence says more than words ever can.",
  },
  { 
  id: 4,
  date: "A Long-Awaited Reunion",
  title: "Finally Together Again",
  description: "After six months of waiting while you settled into college, I finally got to see you again. The moment I saw you, every day of waiting felt worth it."
  },
  {
    id: 5,
    date: "Today",
    title: "Celebrating You",
    description: "Looking back at all these beautiful moments, and feeling so incredibly excited for all the memories we have yet to create.",
  }
];

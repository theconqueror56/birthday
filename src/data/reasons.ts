import { Smile, Heart, Brain, Dumbbell, Shield, Laugh, Sparkles, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Reason {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const REASONS: Reason[] = [
  {
    id: 1,
    title: "Your Smile",
    description: "It effortlessly brightens up even the darkest of days and brings joy to everyone around you.",
    icon: Smile,
  },
  {
    id: 2,
    title: "Your Kindness",
    description: "You have a heart of gold and always treat others with incredible compassion and empathy.",
    icon: Heart,
  },
  {
    id: 3,
    title: "Your Intelligence",
    description: "The way you think and solve problems is truly inspiring. I learn from you every day.",
    icon: Brain,
  },
  {
    id: 4,
    title: "Your Strength",
    description: "Your resilience in the face of challenges shows an inner strength that is absolutely beautiful.",
    icon: Dumbbell,
  },
  {
    id: 5,
    title: "Your Support",
    description: "You are a pillar of support, always there to lift me up and encourage me to be my best self.",
    icon: Shield,
  },
  {
    id: 6,
    title: "Your Humor",
    description: "Your laughter is my favorite sound, and you always know exactly how to make me smile.",
    icon: Laugh,
  },
  {
    id: 7,
    title: "Your Confidence",
    description: "The grace and confidence with which you carry yourself is nothing short of mesmerizing.",
    icon: Sparkles,
  },
  {
    id: 8,
    title: "Your Beautiful Soul",
    description: "Inside and out, you radiate a pure, genuine beauty that makes the world a better place.",
    icon: Star,
  }
];

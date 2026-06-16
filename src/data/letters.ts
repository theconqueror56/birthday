export interface Letter {
  id: string;
  title: string;
  content: string;
}

export const LETTERS: Letter[] = [
  {
    id: "happy",
    title: "Open When You're Happy",
    content: "My love,\n\nI am so glad you're smiling today! Remember this exact feeling, bottle it up, and know that your happiness is my favorite thing in the entire world.\n\nKeep shining your beautiful light everywhere you go. I love you so much.\n\nYours always,\n❤️",
  },
  {
    id: "sad",
    title: "Open When You're Sad",
    content: "Hey beautiful soul,\n\nI hate knowing you're feeling down right now. Please take a deep breath. Remember that storms don't last forever, and I am always here to hold your hand through the rain.\n\nYou are so much stronger than you know. Lean on me whenever you need to.\n\nLove,\n❤️",
  },
  {
    id: "miss-me",
    title: "Open When You Miss Me",
    content: "Darling,\n\nI miss you too! No matter the physical distance between us, you are always in my heart and constantly on my mind.\n\nClose your eyes and you'll feel me right there beside you. Counting down the seconds until I can hold you again.\n\nForever yours,\n❤️",
  },
  {
    id: "birthday",
    title: "Open On Your Birthday",
    content: "Happy Birthday my incredible love!\n\nToday is all about celebrating the masterpiece that is YOU. I hope your day is as beautiful, bright, and extraordinary as you make my life every single day.\n\nHere's to another year of making unforgettable memories together. I love you endlessly!\n\n❤️",
  }
];

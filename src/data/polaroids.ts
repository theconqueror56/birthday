import birth from "../images/birth.jpeg"
import kid from "../images/kid.jpeg"
import manali from "../images/manali.jpeg"
import birthday from "../images/birthday.jpeg"
import usschool from "../images/usschool.jpeg"
import usani from "../images/usani.jpeg"

export interface Polaroid {
  id: number;
  image: string;
  caption: string;
  rotation: number;
}

export const POLAROIDS: Polaroid[] = [
  {
    id: 1,
    image: birth,
    caption: "An angel descended heaven 😇",
    rotation: -4,
  },
  {
    id: 2,
    image: kid,
    caption: "Little Angel Walking 😊",
    // date: "October 2022",
    rotation: 6,
  },
  {
    id: 3,
    image: manali,
    caption: "Laughing untill it hurt's 😂",
    // date: "January 2023",
    rotation: -2,
  },
  {
    id: 4,
    image: birthday,
    caption: "Best Birthday Surprize 🎈",
    // date: "March 2023",
    rotation: 5,
  },
  {
    id: 5,
    image: usschool,
    caption: "Quite mornings with you",
    // date: "July 2023",
    rotation: -6,
  },
  {
    id: 6,
    image: usani,
    caption: "Forever my person ❤️",
    // date: "Today",
    rotation: 3,
  }
];

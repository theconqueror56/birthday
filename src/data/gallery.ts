import parents from "../images/parents.jpeg"
import red from "../images/red.jpeg"
import birthday from "../images/birthdayh.jpeg"
import friends from "../images/friends.jpeg"
import saree from "../images/saree.jpeg"
import cute from "../images/cute.jpeg"
import sunlight from "../images/sunlight.jpeg"
import birth2 from "../images/birth2.jpeg"
import teddy from "../images/teddy.jpeg"


export interface GalleryImage {
  id: number;
  src: string;
  // alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: parents },
  { id: 2, src: friends },
  { id: 3, src: sunlight },
  { id: 4, src: red},
  { id: 5, src: saree },
  { id: 6, src: cute },
  { id: 7, src: birthday },
  { id: 8, src: teddy },
  { id: 9, src: birth2 },
];

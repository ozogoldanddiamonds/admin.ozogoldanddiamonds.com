export interface Section {
  title: string;
  description: string;
  image: string;
  isActive: boolean;
}

export interface Ads {
  _id: string;
  section1: Section;
  section2: Section;
  section3: Section;
  createdAt: string;
  updatedAt: string;
}
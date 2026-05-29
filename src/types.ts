export interface Breeder {
  id: string;
  name: string;
  location: string;
  country: string;
  specialties: string[];
  bio: string;
  verified: boolean;
  rating: number;
  imageUrl: string;
}

export interface VlogPost {
  id: string;
  authorName: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  likes: number;
}

export interface LiveArtist {
  id: string;
  name: string;
  style: string;
  website: string;
  bio: string;
  live: boolean;
}

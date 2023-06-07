export interface product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: number;
  title: string;
  quantity: number;
  isFavorite: boolean;
  thumbnail: string;
  discountPercentage: number;
  brand: string;
  review: string[];
  images: string[];
  stock: number;
}

export interface productCategory {
  smartphone: product[];
  laptops: product[];
  fragrances: product[];
  skincare: product[];
  groceries: product[];
  homedecoration: product[];
}

export interface userData {
  name: string;
  email: string;
}

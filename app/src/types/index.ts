export interface Product {
  id: string;
  name: string;
  category: 'gold' | 'diamond' | 'silver' | 'bridal' | 'daily-wear';
  metal: string;
  purity?: string;
  weight?: number;
  makingCharges?: number;
  basePrice: number;
  finalPrice: number;
  images: string[];
  stock: number;
  description?: string;
  featured?: boolean;
  bestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'upi' | 'razorpay' | 'cash-at-store';
  deliveryAddress?: Address;
  phone: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface CustomOrder {
  id: string;
  userId?: string;
  designImage?: string;
  budget: number;
  metal: string;
  message?: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'completed';
  createdAt: Date;
}

export interface GoldRate {
  metal: 'gold' | 'silver';
  purity: string;
  pricePerGram: number;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  addresses?: Address[];
  orders?: Order[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar?: string;
  date: Date;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  products: string[];
}

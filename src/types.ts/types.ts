// src/types.ts
// Shared TypeScript types for the menu app

// Predefined courses
export type Course = 'Starter' | 'Main' | 'Dessert';

// Menu item interface
export interface MenuItem {
  id: string;           // unique id (string for ease)
  name: string;         // dish name
  description: string;  // brief description
  course: Course;       // one of the predefined courses
  price: number;        // price in the chosen currency (numbers only)
  image?: string;       // optional small image URL (Part 3 can add upload)
}
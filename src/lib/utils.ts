
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatTimeElapsed(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function generateDailyChallenge() {
  // Simple implementation - in a real app, this would be from an API or database
  const today = new Date();
  
  // Generate different puzzles based on the day of the month
  const dayOfMonth = today.getDate();
  const puzzleIndex = dayOfMonth % SAMPLE_PUZZLES.length;
  
  return SAMPLE_PUZZLES[puzzleIndex];
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Sample puzzle data
const SAMPLE_PUZZLES = [
  {
    id: 'puzzle-1',
    title: 'Animal Kingdom',
    description: 'Find all the animal names hidden in the grid.',
    difficulty: 'easy' as const,
    grid: [
      ['L', 'I', 'O', 'N', 'T', 'F'],
      ['T', 'I', 'G', 'E', 'R', 'O'],
      ['Z', 'E', 'B', 'R', 'A', 'X'],
      ['W', 'O', 'L', 'F', 'T', 'B'],
      ['F', 'R', 'O', 'G', 'S', 'E'],
      ['D', 'E', 'E', 'R', 'A', 'R']
    ],
    words: ['LION', 'TIGER', 'ZEBRA', 'WOLF', 'FROG', 'BEAR', 'DEER', 'FOX', 'RAT']
  },
  {
    id: 'puzzle-2',
    title: 'Fruits & Vegetables',
    description: 'Search for hidden fruits and vegetables.',
    difficulty: 'medium' as const,
    grid: [
      ['A', 'P', 'P', 'L', 'E', 'C'],
      ['P', 'E', 'A', 'R', 'G', 'A'],
      ['B', 'A', 'N', 'A', 'N', 'R'],
      ['M', 'P', 'G', 'P', 'I', 'R'],
      ['A', 'E', 'O', 'E', 'O', 'O'],
      ['T', 'A', 'K', 'A', 'N', 'T']
    ],
    words: ['APPLE', 'PEAR', 'BANANA', 'GRAPE', 'CARROT', 'MANGO', 'PINEAPPLE', 'PEA']
  },
  {
    id: 'puzzle-3',
    title: 'World Capitals',
    description: 'Find capital cities from around the world.',
    difficulty: 'hard' as const,
    grid: [
      ['P', 'A', 'R', 'I', 'S', 'B'],
      ['R', 'O', 'M', 'E', 'T', 'E'],
      ['B', 'E', 'R', 'L', 'I', 'N'],
      ['T', 'K', 'D', 'H', 'E', 'G'],
      ['L', 'Y', 'O', 'I', 'R', 'K'],
      ['D', 'U', 'B', 'L', 'I', 'N']
    ],
    words: ['PARIS', 'ROME', 'BERLIN', 'TOKYO', 'DELHI', 'DUBLIN', 'BANGKOK', 'BEIJING']
  }
];

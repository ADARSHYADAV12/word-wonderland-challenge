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
  // Get current date info for seeding the random puzzles
  const today = new Date();
  const dayOfMonth = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  
  // Create a seed based on date - this ensures same puzzle for same day
  const seed = parseInt(`${year}${month+1}${dayOfMonth}`);
  
  // Simple pseudorandom number generator with seed
  const seededRandom = function() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  // Choose a puzzle set based on the day
  const puzzleSetIndex = Math.floor(seededRandom() * PUZZLE_SETS.length);
  const puzzleSet = PUZZLE_SETS[puzzleSetIndex];
  
  // Choose a specific puzzle from the set
  const puzzleIndex = Math.floor(seededRandom() * puzzleSet.puzzles.length);
  
  return {
    ...puzzleSet.puzzles[puzzleIndex],
    title: `${puzzleSet.theme}: ${puzzleSet.puzzles[puzzleIndex].title}`,
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Organized puzzle sets by themes
const PUZZLE_SETS = [
  {
    theme: 'Animal Kingdom',
    puzzles: [
      {
        id: 'animals-1',
        title: 'Wild Mammals',
        description: 'Find all the wild mammals hiding in the grid.',
        difficulty: 'easy' as const,
        grid: [
          ['L', 'I', 'O', 'N', 'T', 'F'],
          ['T', 'I', 'G', 'E', 'R', 'O'],
          ['Z', 'E', 'B', 'R', 'A', 'X'],
          ['W', 'O', 'L', 'F', 'T', 'B'],
          ['F', 'R', 'O', 'G', 'S', 'E'],
          ['D', 'E', 'E', 'R', 'A', 'R']
        ],
        words: ['LION', 'TIGER', 'ZEBRA', 'WOLF', 'BEAR', 'DEER', 'FOX', 'RAT']
      },
      {
        id: 'animals-2',
        title: 'Ocean Life',
        description: 'Discover aquatic creatures hidden in the waters.',
        difficulty: 'medium' as const,
        grid: [
          ['S', 'H', 'A', 'R', 'K', 'W'],
          ['E', 'O', 'C', 'R', 'A', 'H'],
          ['A', 'D', 'T', 'U', 'L', 'A'],
          ['L', 'O', 'O', 'S', 'E', 'L'],
          ['C', 'L', 'P', 'Q', 'W', 'E'],
          ['M', 'P', 'U', 'I', 'D', 'S']
        ],
        words: ['SHARK', 'WHALE', 'SEAL', 'SQUID', 'OCTOPUS', 'DOLPHIN', 'CRAB']
      },
      {
        id: 'animals-3',
        title: 'Jungle Friends',
        description: 'Find exotic creatures from tropical jungles.',
        difficulty: 'hard' as const,
        grid: [
          ['M', 'O', 'N', 'K', 'E', 'Y'],
          ['A', 'Z', 'T', 'L', 'P', 'J'],
          ['C', 'P', 'A', 'N', 'D', 'A'],
          ['A', 'I', 'G', 'E', 'R', 'G'],
          ['W', 'P', 'U', 'O', 'A', 'U'],
          ['S', 'N', 'A', 'K', 'E', 'A']
        ],
        words: ['MONKEY', 'PANDA', 'TIGER', 'SNAKE', 'JAGUAR', 'MACAW', 'APE']
      }
    ]
  },
  {
    theme: 'Food Fiesta',
    puzzles: [
      {
        id: 'food-1',
        title: 'Fruits & Veggies',
        description: 'Search for delicious fruits and vegetables.',
        difficulty: 'easy' as const,
        grid: [
          ['A', 'P', 'P', 'L', 'E', 'C'],
          ['P', 'E', 'A', 'R', 'G', 'A'],
          ['B', 'A', 'N', 'A', 'N', 'R'],
          ['M', 'P', 'G', 'P', 'I', 'R'],
          ['A', 'E', 'O', 'E', 'O', 'O'],
          ['T', 'A', 'K', 'A', 'N', 'T']
        ],
        words: ['APPLE', 'PEAR', 'BANANA', 'GRAPE', 'CARROT', 'MANGO', 'PEA']
      },
      {
        id: 'food-2',
        title: 'Global Cuisine',
        description: 'Find famous dishes from around the world.',
        difficulty: 'medium' as const,
        grid: [
          ['P', 'I', 'Z', 'Z', 'A', 'T'],
          ['A', 'Q', 'S', 'U', 'S', 'H'],
          ['E', 'R', 'C', 'U', 'R', 'I'],
          ['L', 'P', 'A', 'S', 'T', 'A'],
          ['L', 'R', 'K', 'I', 'J', 'T'],
          ['A', 'O', 'T', 'S', 'A', 'C']
        ],
        words: ['PIZZA', 'PASTA', 'SUSHI', 'CURRY', 'TACO', 'STIR', 'PAELLA']
      },
      {
        id: 'food-3',
        title: 'Sweet Treats',
        description: 'Discover delicious desserts and sweet snacks.',
        difficulty: 'hard' as const,
        grid: [
          ['C', 'A', 'K', 'E', 'D', 'P'],
          ['O', 'H', 'W', 'S', 'O', 'I'],
          ['O', 'C', 'L', 'F', 'N', 'E'],
          ['K', 'A', 'F', 'U', 'U', 'T'],
          ['I', 'N', 'D', 'D', 'T', 'A'],
          ['E', 'D', 'Y', 'G', 'S', 'R']
        ],
        words: ['CAKE', 'PIE', 'COOKIE', 'CANDY', 'DONUT', 'FUDGE', 'TART']
      }
    ]
  },
  {
    theme: 'Around the World',
    puzzles: [
      {
        id: 'world-1',
        title: 'Capital Cities',
        description: 'Find capital cities from around the world.',
        difficulty: 'medium' as const,
        grid: [
          ['P', 'A', 'R', 'I', 'S', 'B'],
          ['R', 'O', 'M', 'E', 'T', 'E'],
          ['B', 'E', 'R', 'L', 'I', 'N'],
          ['T', 'K', 'D', 'H', 'E', 'G'],
          ['L', 'Y', 'O', 'I', 'R', 'K'],
          ['D', 'U', 'B', 'L', 'I', 'N']
        ],
        words: ['PARIS', 'ROME', 'BERLIN', 'TOKYO', 'DELHI', 'DUBLIN', 'BEIJING']
      },
      {
        id: 'world-2',
        title: 'Famous Landmarks',
        description: 'Discover iconic landmarks from across the globe.',
        difficulty: 'hard' as const,
        grid: [
          ['T', 'O', 'W', 'E', 'R', 'P'],
          ['O', 'U', 'B', 'D', 'I', 'Y'],
          ['M', 'V', 'C', 'W', 'P', 'R'],
          ['B', 'R', 'S', 'A', 'Y', 'A'],
          ['S', 'A', 'T', 'L', 'L', 'M'],
          ['G', 'T', 'A', 'J', 'I', 'D']
        ],
        words: ['TOWER', 'PYRAMID', 'WALL', 'STATUE', 'TAJ', 'LOUVRE', 'BRIDGE']
      },
      {
        id: 'world-3',
        title: 'Countries',
        description: 'Find countries from different continents.',
        difficulty: 'medium' as const,
        grid: [
          ['S', 'P', 'A', 'I', 'N', 'J'],
          ['B', 'R', 'A', 'Z', 'I', 'L'],
          ['C', 'H', 'I', 'N', 'A', 'I'],
          ['I', 'T', 'A', 'L', 'Y', 'N'],
          ['K', 'E', 'N', 'Y', 'A', 'D'],
          ['J', 'A', 'P', 'A', 'N', 'I']
        ],
        words: ['SPAIN', 'BRAZIL', 'CHINA', 'ITALY', 'KENYA', 'JAPAN', 'INDIA']
      }
    ]
  }
];

// Keep the Sample_PUZZLES for backward compatibility, but don't use it for new code
const SAMPLE_PUZZLES = PUZZLE_SETS.flatMap(set => 
  set.puzzles.map(puzzle => ({
    ...puzzle,
    title: `${set.theme}: ${puzzle.title}`
  }))
);

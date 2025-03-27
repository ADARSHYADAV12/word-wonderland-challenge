
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Calendar, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

const ArchivePage = () => {
  // In a real app, this would come from an API or database
  const archivedChallenges = [
    {
      id: 'challenge-1',
      title: 'Animal Kingdom',
      description: 'Find all the animal names hidden in the grid.',
      date: new Date(Date.now() - 86400000), // Yesterday
      difficulty: 'easy',
      wordsCount: 9
    },
    {
      id: 'challenge-2',
      title: 'Fruits & Vegetables',
      description: 'Search for hidden fruits and vegetables.',
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      difficulty: 'medium',
      wordsCount: 8
    },
    {
      id: 'challenge-3',
      title: 'World Capitals',
      description: 'Find capital cities from around the world.',
      date: new Date(Date.now() - 86400000 * 3), // 3 days ago
      difficulty: 'hard',
      wordsCount: 8
    },
    {
      id: 'challenge-4',
      title: 'Sports Vocabulary',
      description: 'Discover sports-related terms in this challenging grid.',
      date: new Date(Date.now() - 86400000 * 4), // 4 days ago
      difficulty: 'medium',
      wordsCount: 10
    },
    {
      id: 'challenge-5',
      title: 'Space Exploration',
      description: 'Journey through space-related words in this cosmic puzzle.',
      date: new Date(Date.now() - 86400000 * 5), // 5 days ago
      difficulty: 'hard',
      wordsCount: 7
    }
  ];
  
  // Map difficulty to colors for badges
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    hard: 'bg-red-100 text-red-700 border-red-200'
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-5xl pt-8 pb-24 px-4">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" size="sm" className="mr-4">
            <Link to="/">
              <ArrowLeft size={16} className="mr-1" />
              Back
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold">Challenge Archive</h1>
        </div>
        
        <div className="space-y-6">
          {archivedChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              className="bg-white rounded-xl border border-border shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">
                      {formatDate(challenge.date)}
                    </span>
                  </div>
                  
                  <div className={`text-sm px-3 py-1 rounded-full border ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}`}>
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-2">{challenge.title}</h2>
                <p className="text-muted-foreground mb-4">{challenge.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock size={16} className="mr-1.5" />
                    <span>Est. time: {challenge.difficulty === 'easy' ? '5-10' : challenge.difficulty === 'medium' ? '10-15' : '15-20'} min</span>
                  </div>
                  
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link to={`/game?id=${challenge.id}`} className="flex items-center">
                      Play
                      <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArchivePage;

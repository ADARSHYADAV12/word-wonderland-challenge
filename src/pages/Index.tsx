
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Calendar, 
  Lightbulb, 
  Trophy, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl pt-12 pb-24 px-4">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl -z-10" />
          
          <div className="grid md:grid-cols-2 gap-12 py-16 px-6 md:px-12">
            <motion.div 
              className="flex flex-col justify-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-border shadow-sm">
                <Sparkles size={14} className="text-purple-500" />
                <span className="text-xs font-medium">Discover the power of words</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="text-gradient-primary">Challenge</span> your mind with daily word puzzles
              </h1>
              
              <p className="text-muted-foreground text-lg">
                Engage your brain with our beautifully crafted word search puzzles. 
                Find hidden words, earn points, and track your progress.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-12 rounded-full">
                  <Link to="/game">
                    <span>Play Today's Challenge</span>
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="h-12 rounded-full">
                  <Link to="/archive">
                    Explore Past Challenges
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-full max-w-sm aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="grid grid-cols-6 grid-rows-6 gap-1 p-4">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="letter-cell"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + (i * 0.01) }}
                      >
                        {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <motion.div 
                  className="absolute -right-8 -top-8 bg-purple-100 rounded-lg shadow-sm p-3 border border-purple-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Lightbulb size={24} className="text-purple-500" />
                </motion.div>
                
                <motion.div 
                  className="absolute -left-8 -bottom-8 bg-blue-100 rounded-lg shadow-sm p-3 border border-blue-200"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Trophy size={24} className="text-blue-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How to Play</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              WordWonder combines classic word search with modern design and engaging challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-6 border border-border shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${feature.iconBg}`}>
                  <feature.icon size={24} className={feature.iconColor} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Daily Challenge CTA */}
        <section className="py-12">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-grid-white/[0.1] opacity-30" />
            
            <div className="relative py-12 px-6 md:px-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready for Today's Challenge?</h2>
                <p className="text-white/80 text-lg mb-8">
                  A new word puzzle is waiting for you. Challenge yourself and see how quickly you can find all the hidden words!
                </p>
                
                <Button asChild size="lg" variant="secondary" className="h-12 rounded-full">
                  <Link to="/game" className="flex items-center">
                    <Calendar size={18} className="mr-2" />
                    Play Daily Challenge
                    <ChevronRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const features = [
  {
    title: 'Find Hidden Words',
    description: 'Search for words horizontally, vertically, diagonally, forwards and backwards in our cleverly designed grids.',
    icon: Sparkles,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50'
  },
  {
    title: 'Daily Challenges',
    description: 'A new puzzle every day to keep your mind sharp. Track your streak and compare your times.',
    icon: Calendar,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50'
  },
  {
    title: 'Strategic Hints',
    description: 'Stuck on a tough word? Use hints wisely to reveal letters or get a clue about the word's meaning.',
    icon: Lightbulb,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50'
  }
];

export default Index;


import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Share2, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    wordsFound: number;
    totalWords: number;
    hintsUsed: number;
    timeElapsed: string;
  };
  onShare: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  stats,
  onShare
}) => {
  // Launch confetti when the modal opens
  React.useEffect(() => {
    if (isOpen) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0, 0.2) }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0, 0.2) }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate score based on words found, hints used, and time
  const score = Math.round(
    (stats.wordsFound / stats.totalWords) * 100 - 
    (stats.hintsUsed * 5)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            className="absolute inset-0 bg-black/25 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="bg-white rounded-2xl shadow-lg w-full max-w-md relative z-10 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="absolute top-0 right-0 left-0 h-24 bg-gradient-to-r from-blue-600 to-purple-600" />
            
            <div className="px-6 pt-16 pb-8 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Trophy size={32} className="text-yellow-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mt-6 mb-2">Challenge Complete!</h2>
              <p className="text-muted-foreground text-center mb-6">
                Congratulations! You've found all {stats.totalWords} words.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">Words Found</p>
                  <p className="text-xl font-bold">{stats.wordsFound}/{stats.totalWords}</p>
                </div>
                
                <div className="bg-secondary rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="text-xl font-bold">{stats.timeElapsed}</p>
                </div>
                
                <div className="bg-secondary rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">Hints Used</p>
                  <p className="text-xl font-bold">{stats.hintsUsed}</p>
                </div>
                
                <div className="bg-secondary rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-xl font-bold">{score}%</p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button onClick={onShare} className="w-full flex items-center justify-center gap-2">
                  <Share2 size={16} />
                  <span>Share Your Results</span>
                </Button>
                
                <Button variant="outline" onClick={onClose} className="w-full">
                  Close
                </Button>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <a 
                  href="/archive" 
                  className="flex items-center justify-between text-primary hover:underline"
                >
                  <span>Try Another Challenge</span>
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CompletionModal;

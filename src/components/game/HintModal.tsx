
import React from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
import { Lightbulb, X } from 'lucide-react';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint: {
    type: 'letter' | 'word' | 'definition';
    content: string;
  };
}

const HintModal: React.FC<HintModalProps> = ({ 
  isOpen, 
  onClose, 
  hint 
}) => {
  if (!isOpen) return null;
  
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-6 pb-8">
              <div className="absolute top-4 right-4">
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Lightbulb size={20} />
                </div>
                <h2 className="text-xl font-semibold">Here's a hint!</h2>
              </div>
              
              <div className="space-y-4">
                {hint.type === 'letter' && (
                  <>
                    <p className="text-muted-foreground">
                      Look for a word that contains this letter:
                    </p>
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl font-bold text-amber-600">
                        {hint.content}
                      </div>
                    </div>
                  </>
                )}
                
                {hint.type === 'word' && (
                  <>
                    <p className="text-muted-foreground">
                      One of the hidden words is:
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                      <span className="text-xl font-medium text-amber-700">
                        {hint.content}
                      </span>
                    </div>
                  </>
                )}
                
                {hint.type === 'definition' && (
                  <>
                    <p className="text-muted-foreground">
                      Look for a word that means:
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-amber-700 font-medium italic">
                        "{hint.content}"
                      </p>
                    </div>
                  </>
                )}
                
                <p className="text-sm text-muted-foreground text-center pt-3">
                  Hint used! You have a limited number of hints per puzzle.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HintModal;

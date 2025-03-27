
import React from 'react';
import { Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WordListProps {
  words: string[];
  foundWords: string[];
  showAll?: boolean;
}

const WordList: React.FC<WordListProps> = ({ 
  words, 
  foundWords, 
  showAll = false 
}) => {
  // If not showing all, mask unfound words
  const displayWords = words.map(word => {
    const isFound = foundWords.includes(word);
    // If word is found or showAll is true, show the word, otherwise mask it
    const displayText = isFound || showAll ? word : '•'.repeat(word.length);
    
    return {
      original: word,
      display: displayText,
      isFound
    };
  });
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Word List</h3>
          <span className="text-sm text-muted-foreground">
            {foundWords.length} / {words.length} found
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {displayWords.map((word, index) => (
            <div 
              key={index}
              className={cn(
                "px-3 py-2 rounded-lg border flex items-center justify-between",
                word.isFound 
                  ? "bg-game-correct border-green-200 text-green-700" 
                  : "bg-white border-border text-muted-foreground"
              )}
            >
              <span className={cn(
                "font-medium",
                !word.isFound && !showAll && "font-mono"
              )}>
                {word.display}
              </span>
              
              {word.isFound ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Search size={16} className="text-muted-foreground/50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordList;

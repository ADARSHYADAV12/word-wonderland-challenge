
import React from 'react';
import { 
  AlertCircle, 
  ExternalLink, 
  Share2, 
  Lightbulb 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface GameControlsProps {
  wordsFound: number;
  totalWords: number;
  hintsRemaining: number;
  onUseHint: () => void;
  onShare: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  wordsFound,
  totalWords,
  hintsRemaining,
  onUseHint,
  onShare
}) => {
  const progress = (wordsFound / totalWords) * 100;
  
  const handleShare = () => {
    onShare();
    toast.success("Challenge link copied to clipboard!", {
      position: "top-center",
      duration: 3000
    });
  };
  
  const handleUseHint = () => {
    if (hintsRemaining > 0) {
      onUseHint();
    } else {
      toast.error("No hints remaining", {
        position: "top-center"
      });
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-panel rounded-2xl p-6 space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{wordsFound} / {totalWords} Words</span>
          </div>
          
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <Separator />
        
        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="px-4 py-2 h-auto rounded-full flex gap-2 bg-white hover:bg-secondary">
                <Lightbulb size={16} />
                <span>Hint ({hintsRemaining})</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Use a Hint?</DialogTitle>
                <DialogDescription>
                  You have {hintsRemaining} hint{hintsRemaining !== 1 ? 's' : ''} remaining. A hint will reveal a random letter or word on the board.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2 mt-4">
                <Button variant="outline" className="flex-1" onClick={() => {}}>
                  Cancel
                </Button>
                <Button 
                  className="flex-1" 
                  disabled={hintsRemaining <= 0}
                  onClick={handleUseHint}
                >
                  Use Hint
                </Button>
              </div>
              {hintsRemaining <= 0 && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  You're out of hints for today's challenge.
                </p>
              )}
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="px-4 py-2 h-auto rounded-full flex gap-2 bg-white hover:bg-secondary" onClick={handleShare}>
            <Share2 size={16} />
            <span>Share</span>
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="px-4 py-2 h-auto rounded-full flex gap-2 bg-white hover:bg-secondary">
                <AlertCircle size={16} />
                <span>How to Play</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>How to Play</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <p className="text-sm">Find all the hidden words in the grid by selecting letters in a straight line - horizontally, vertically, or diagonally.</p>
                
                <div className="text-sm space-y-2">
                  <p className="font-medium">1. Select letters in sequence</p>
                  <p>Tap the first letter, then drag or tap connected letters to form a word.</p>
                </div>
                
                <div className="text-sm space-y-2">
                  <p className="font-medium">2. Complete the selection</p>
                  <p>Tap the last letter to submit your word, or tap "Clear Selection" to start over.</p>
                </div>
                
                <div className="text-sm space-y-2">
                  <p className="font-medium">3. Words can read in any direction</p>
                  <p>Forward, backward, up, down, or diagonally!</p>
                </div>
                
                <div className="text-sm space-y-2">
                  <p className="font-medium">4. Use hints wisely</p>
                  <p>You have a limited number of hints per puzzle.</p>
                </div>
                
                <div className="flex justify-end">
                  <a href="/tutorial" className="text-sm text-primary flex items-center gap-1">
                    View full tutorial
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default GameControls;

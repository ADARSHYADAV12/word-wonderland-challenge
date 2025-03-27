
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ChallengeHeaderProps {
  title: string;
  description: string;
  date: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  timeRemaining?: string;
}

const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({
  title,
  description,
  date,
  difficulty,
  timeRemaining
}) => {
  // Map difficulty to colors
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    hard: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 animate-fade-in">
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          
          <div className="flex items-center space-x-3">
            <div className={`text-sm px-3 py-1 rounded-full border ${difficultyColors[difficulty]}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </div>
            
            {timeRemaining && (
              <div className="flex items-center space-x-1.5 text-sm text-muted-foreground">
                <Clock size={16} />
                <span>{timeRemaining}</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground">{description}</p>
        
        <div className="flex items-center space-x-1.5 text-sm text-muted-foreground">
          <Calendar size={16} />
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeHeader;

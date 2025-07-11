import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Zap, Clock, Award } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AchievementsModal = ({ isOpen, onClose }: AchievementsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy size={20} />
            Achievements
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  achievement.unlocked 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <achievement.icon size={20} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                
                <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                  {achievement.unlocked ? "Unlocked" : "Locked"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const achievements = [
  {
    id: 'first-word',
    title: 'First Steps',
    description: 'Find your first word',
    icon: Star,
    unlocked: true,
  },
  {
    id: 'puzzle-master',
    title: 'Puzzle Master',
    description: 'Complete 10 puzzles',
    icon: Target,
    unlocked: false,
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete a puzzle in under 2 minutes',
    icon: Zap,
    unlocked: false,
  },
  {
    id: 'no-hints',
    title: 'Pure Solver',
    description: 'Complete a puzzle without using hints',
    icon: Award,
    unlocked: true,
  },
  {
    id: 'streak-week',
    title: 'Week Warrior',
    description: 'Complete daily challenges for 7 days straight',
    icon: Clock,
    unlocked: false,
  },
];

export default AchievementsModal;
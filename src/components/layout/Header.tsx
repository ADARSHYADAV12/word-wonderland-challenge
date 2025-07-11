
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, Settings, Trophy, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import ProfileModal from '@/components/profile/ProfileModal';
import AchievementsModal from '@/components/profile/AchievementsModal';
import SettingsModal from '@/components/profile/SettingsModal';

const Header = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [achievementsModalOpen, setAchievementsModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <header className="w-full h-16 px-4 border-b border-border bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl h-full mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-lg">
            W
          </div>
          <span className="font-semibold text-lg md:text-xl hidden md:block">WordWonder</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/90 hover:text-primary transition-colors">
            Daily Challenge
          </Link>
          <Link to="/archive" className="text-foreground/90 hover:text-primary transition-colors">
            Archive
          </Link>
          <Link to="/leaderboard" className="text-foreground/90 hover:text-primary transition-colors">
            Leaderboard
          </Link>
          <Link to="/how-to-play" className="text-foreground/90 hover:text-primary transition-colors">
            How to Play
          </Link>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setProfileModalOpen(true)}>
                <User size={16} className="mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAchievementsModalOpen(true)}>
                <Trophy size={16} className="mr-2" />
                <span>Achievements</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSettingsModalOpen(true)}>
                <Settings size={16} className="mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 rounded-full">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="flex items-center px-2 py-3 rounded-md hover:bg-secondary transition-colors">
                  <span className="text-lg font-medium">Daily Challenge</span>
                </Link>
                <Link to="/archive" className="flex items-center px-2 py-3 rounded-md hover:bg-secondary transition-colors">
                  <span className="text-lg font-medium">Archive</span>
                </Link>
                <Link to="/leaderboard" className="flex items-center px-2 py-3 rounded-md hover:bg-secondary transition-colors">
                  <span className="text-lg font-medium">Leaderboard</span>
                </Link>
                <Link to="/how-to-play" className="flex items-center px-2 py-3 rounded-md hover:bg-secondary transition-colors">
                  <span className="text-lg font-medium">How to Play</span>
                </Link>
                <div className="h-[1px] bg-border my-2"></div>
                <Link to="/profile" className="flex items-center px-2 py-3 rounded-md hover:bg-secondary transition-colors">
                  <User size={18} className="mr-3" />
                  <span className="text-lg font-medium">Profile</span>
                </Link>
                <Link to="/settings" className="flex items-center px-2 py-3 rounded-md hover:bg-secondary transition-colors">
                  <Settings size={18} className="mr-3" />
                  <span className="text-lg font-medium">Settings</span>
                </Link>
                <Link to="/about" className="flex items-center px-2 py-3 rounded-md hover:bg-secondary transition-colors">
                  <Info size={18} className="mr-3" />
                  <span className="text-lg font-medium">About</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Modals */}
      <ProfileModal 
        isOpen={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)} 
      />
      <AchievementsModal 
        isOpen={achievementsModalOpen} 
        onClose={() => setAchievementsModalOpen(false)} 
      />
      <SettingsModal 
        isOpen={settingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)} 
      />
    </header>
  );
};

export default Header;

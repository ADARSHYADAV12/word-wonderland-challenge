import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load name from localStorage
    const savedName = localStorage.getItem('userProfile');
    if (savedName) {
      try {
        const profile = JSON.parse(savedName);
        setName(profile.name || '');
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    } else {
      setIsEditing(true); // If no name exists, start in edit mode
    }
  }, [isOpen]);

  const handleSave = () => {
    if (name.trim()) {
      const profile = { name: name.trim() };
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User size={20} />
            Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={!name.trim()}>
                    Save
                  </Button>
                  {name && (
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{name || 'No name set'}</span>
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  Edit
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
import React from 'react';
import { Search, User, Settings, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

export function Navbar() {
  const { state, dispatch } = useApp();
  const { toast } = useToast();

  const handleAuthAction = () => {
    if (state.isAuthenticated) {
      dispatch({ type: 'LOGOUT' });
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    } else {
      // Mock login
      dispatch({
        type: 'SET_USER',
        payload: {
          id: '1',
          username: 'CarLover2024',
          avatar: '🚗',
        },
      });
      toast({
        title: "Logged in",
        description: "Welcome back to Serstation!",
      });
    }
  };

  const handleProfileClick = () => {
    if (!state.isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to access your profile.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile",
        description: "Profile page coming soon!",
      });
    }
  };

  return (
    <nav className="bg-primary text-primary-foreground border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Car className="w-6 h-6 text-car-accent" />
            <h1 className="text-xl font-bold">Serstation</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-sm hover:text-car-accent transition-colors">
              Loca Bar
            </button>
            <button 
              onClick={handleProfileClick}
              className="text-sm hover:text-car-accent transition-colors"
            >
              Profiles
            </button>
            <button className="text-sm hover:text-car-accent transition-colors">
              Car Info
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:text-car-accent hover:bg-primary/80"
            >
              <Search className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileClick}
              className="text-primary-foreground hover:text-car-accent hover:bg-primary/80"
            >
              <User className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:text-car-accent hover:bg-primary/80"
            >
              <Settings className="w-4 h-4" />
            </Button>

            <Button
              onClick={handleAuthAction}
              size="sm"
              className="bg-car-accent hover:bg-car-accent/90 text-white"
            >
              {state.isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
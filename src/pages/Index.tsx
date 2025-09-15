import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from '@/contexts/AppContext';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { PostFeed } from '@/components/PostFeed';
import { CarMascot } from '@/components/CarMascot';
import { CreatePostModal } from '@/components/CreatePostModal';
import { FloatingCreateButton } from '@/components/FloatingCreateButton';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const Index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          
          <div className="flex">
            <Sidebar />
            <PostFeed />
            <CarMascot />
          </div>

          <CreatePostModal />
          <FloatingCreateButton />
        </div>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default Index;

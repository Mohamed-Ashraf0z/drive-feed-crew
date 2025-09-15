import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface Post {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  groupId: string;
  liked?: boolean;
}

export interface Group {
  id: string;
  name: string;
  icon?: string;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  selectedGroup: string | null;
  posts: Post[];
  groups: Group[];
  isCreatePostOpen: boolean;
}

// Mock data
const mockGroups: Group[] = [
  { id: 'beask', name: 'Beask' },
  { id: 'tuning', name: 'Tuning' },
  { id: 'electric', name: 'Electric' },
  { id: 'canviad', name: 'Canviad' },
  { id: 'off-road', name: 'Off-road' },
  { id: 'cefalafi', name: 'Cefalafi' },
  { id: 'evocortan', name: 'Evocortan' },
  { id: 'gratsit', name: 'Gratsit' },
];

const mockPosts: Post[] = [
  {
    id: '1',
    username: 'CarEnthusiast',
    content: 'Just got back from a track day with my AMG GT. The handling is absolutely incredible - feels like the car is connected to your thoughts. Anyone else been to Circuit de Monaco recently?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 24,
    comments: 8,
    shares: 3,
    groupId: 'tuning',
  },
  {
    id: '2',
    username: 'ElectricDriver',
    content: 'Finally made the switch to electric with a Model S Plaid. The instant torque is addictive and the autopilot features are getting better every update. Still missing the engine sound though...',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 17,
    comments: 12,
    shares: 5,
    groupId: 'electric',
  },
  {
    id: '3',
    username: 'OffRoadAddict',
    content: 'Took the Jeep through some serious mud trails this weekend. Nothing beats the freedom of exploring places most cars can\'t go. Who else is planning some off-road adventures?',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 31,
    comments: 15,
    shares: 7,
    groupId: 'off-road',
  },
  {
    id: '4',
    username: 'ClassicRestorer',
    content: 'After 3 years of restoration, my 1967 Mustang is finally roadworthy again. Original 289 V8, all matching numbers. There\'s something special about bringing these classics back to life.',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 45,
    comments: 22,
    shares: 9,
    groupId: 'beask',
  },
];

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SELECTED_GROUP'; payload: string | null }
  | { type: 'ADD_POST'; payload: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares'> }
  | { type: 'TOGGLE_LIKE'; payload: { postId: string } }
  | { type: 'SET_CREATE_POST_OPEN'; payload: boolean }
  | { type: 'LOGOUT' };

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  selectedGroup: null,
  posts: mockPosts,
  groups: mockGroups,
  isCreatePostOpen: false,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    
    case 'SET_SELECTED_GROUP':
      return {
        ...state,
        selectedGroup: action.payload,
      };
    
    case 'ADD_POST':
      const newPost: Post = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
      };
      return {
        ...state,
        posts: [newPost, ...state.posts],
        isCreatePostOpen: false,
      };
    
    case 'TOGGLE_LIKE':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }
            : post
        ),
      };
    
    case 'SET_CREATE_POST_OPEN':
      return {
        ...state,
        isCreatePostOpen: action.payload,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
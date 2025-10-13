// src/contexts/TitleContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { UserBasic, UserExtra } from '~/global/user';

interface StoreContextType {
  page: {
    title: string
  };
  setPage: React.Dispatch<React.SetStateAction<{ title: string }>>;
  user: (UserBasic & UserExtra) | null,
  handleSetUser: (user: (UserBasic & UserExtra) | null) => void; 
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState({ title: ''});
  const [user, setUser] = useState<(UserBasic & UserExtra) | null>(null);

  function handleSetUser (user: (UserBasic & UserExtra) | null) {
    if (!user) return;
    setUser(user)
  }

  const contextValues = {
    page,
    setPage,
    user,
    handleSetUser
  }

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
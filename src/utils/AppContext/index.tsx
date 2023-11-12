import { createContext, useState, useContext, PropsWithChildren } from 'react';

interface SearchResult {
  uid: string;
  name: string;
  earthAnimal: string;
}

interface AppContextProps {
  searchInput: string;
  results: SearchResult[];
  updateSearchValue: (value: string) => void;
  updateResults: (newResults: SearchResult[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const AppProvider = ({ children }:PropsWithChildren) => {
  const [searchInput, setSearchInput] = useState<string>(localStorage.getItem('searchText') || '');
  const [results, setResults] = useState<SearchResult[]>([]);

  const updateSearchValue = (value: string) => {
    setSearchInput(value);
  };

  const updateResults = (newResults: SearchResult[]) => {
    setResults(newResults);
  };

  return (
    <AppContext.Provider value={{ searchInput, results, updateSearchValue, updateResults }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

import React, {
  createContext,
  useContext,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageProviderProps {
  children: ReactNode;
}

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

interface StorageContextData {
  getStoragedData(): Promise<LoginDataProps[]>;
  setStoragedData(data: LoginDataProps): Promise<void>;
}

const StorageContext = createContext({} as StorageContextData);

export function StorageProvider({ children }: StorageProviderProps) {
  const storageKey = '@passmanager:logins';

  async function getStoragedData() {
    const storagedData = await AsyncStorage.getItem(storageKey);
    
    if (storagedData) {
      const parsedData = JSON.parse(storagedData) as LoginDataProps[];

      return parsedData;
    }

    return [];
  }

  async function setStoragedData(newLoginData: LoginDataProps) {
    try {
      const storagedData = await AsyncStorage.getItem(storageKey);

      const logins = storagedData ? JSON.parse(storagedData) : [];

      const updatedLogins = [...logins, newLoginData];

      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedLogins));
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <StorageContext.Provider value={{
      getStoragedData,
      setStoragedData,
    }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorageData() {
  const context = useContext(StorageContext);

  return context;
}

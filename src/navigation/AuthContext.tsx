import { createContext } from 'react';

type AuthContextType = {
  user: boolean;
  setUser: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: false,
  setUser: () => {} 
});

export default AuthContext;
import React, { useState, createContext, useContext } from 'react';

// Definir los tipos de los valores en el contexto
interface IdContextType {
  teamId: string | null;
  proyId: string | null;
  setTeamId: React.Dispatch<React.SetStateAction<string | null>>;
  setProyId: React.Dispatch<React.SetStateAction<string | null>>;
}

// Crear el contexto con un valor inicial
const IdContext = createContext<IdContextType>({
  teamId: null,
  proyId: null,
  setTeamId: () => {},
  setProyId: () => {},
});

// Componente proveedor del contexto
export const IdProvider: React.FC = ({ children }) => {
  const [teamId, setTeamId] = useState<string | null>(null);
  const [proyId, setProyId] = useState<string | null>(null);

  return (
    <IdContext.Provider value={{ teamId, proyId, setTeamId, setProyId }}>
      {children}
    </IdContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useIds = () => useContext(IdContext);

export default IdContext;

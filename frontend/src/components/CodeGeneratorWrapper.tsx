import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { CodeGenerator } from './CodeGenerator';

interface CodeGeneratorWrapperProps {
  onAuthRequired: () => void;
}

export const CodeGeneratorWrapper: React.FC<CodeGeneratorWrapperProps> = ({ onAuthRequired }) => {
  const { isAuthenticated } = useAuth();

  return (
    <CodeGenerator 
      isAuthenticated={isAuthenticated}
      onAuthRequired={onAuthRequired}
    />
  );
}; 
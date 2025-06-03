// src/common/Button/styles.ts - REMPLACE TOUT LE CONTENU
import styled from "styled-components";

export const StyledButton = styled("button")<{ color?: string }>`
  background: ${(p) => 
    p.color === "demo" 
      ? "white"  // Chanel Classic pour démo
      : p.color || "#18216d"  // Couleur par défaut pour autres boutons
  };
  
  color: ${(p) => 
    p.color === "demo" 
      ? "#1a1a1a"  // Texte noir pour Chanel Classic
      : "white"
  };
  
  border: ${(p) => 
    p.color === "demo" 
      ? "2px solid #1a1a1a"  // Bordure noire Chanel
      : "none"
  };
  
  box-shadow: ${(p) => 
    p.color === "demo" 
      ? "0 4px 15px rgba(0, 0, 0, 0.1)"  // Ombre Chanel
      : "0 4px 8px rgba(0, 0, 0, 0.2)"
  };
  
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  border-radius: 8px;
  padding: 16px 36px;
  cursor: pointer;
  margin-top: 0.625rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.3px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  &:hover {
    background: ${(p) => 
      p.color === "demo" 
        ? "#1a1a1a"  // Fond noir au hover Chanel
        : p.color ? p.color : "#18216d"
    };
    
    color: ${(p) => 
      p.color === "demo" 
        ? "white"  // Texte blanc au hover Chanel
        : "white"
    };
    
    transform: translateY(-2px);
    
    box-shadow: ${(p) => 
      p.color === "demo" 
        ? "0 8px 25px rgba(0, 0, 0, 0.2)"  // Ombre plus forte Chanel
        : "0 6px 12px rgba(0, 0, 0, 0.3)"
    };
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media only screen and (max-width: 1024px) {
    padding: 14px 28px;
  }
  
  @media only screen and (max-width: 768px) {
    margin-top: 1rem;
    padding: 12px 24px;
    font-size: 0.9rem;
  }
  
  @media only screen and (max-width: 414px) {
    font-size: 0.875rem;
    padding: 10px 20px;
  }
`;
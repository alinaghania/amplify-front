// src/common/Button/styles.ts - REMPLACE TOUT LE CONTENU
import styled from "styled-components";

export const StyledButton = styled("button")<{ color?: string }>`
  background: ${(p) => p.color || "#FF6B6B"};
  color: ${(p) => (p.color ? "#1E293B" : "#fff")};
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid #edf3f5;
  border-radius: 12px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);

  &:hover,
  &:active,
  &:focus {
    color: #fff;
    border: 1px solid #4ECDC4;
    background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4);
  }
`;
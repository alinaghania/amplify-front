// src/components/PartnersBanner/styles.ts - REMPLACE TOUT LE CONTENU
import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const PartnersSection = styled.section`
  background: linear-gradient(135deg, #F8FAFC 0%, rgba(255, 230, 109, 0.1) 50%, #F1F5F9 100%);
  padding: 4rem 0;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B6B' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    pointer-events: none;
  }

  @media only screen and (max-width: 768px) {
    padding: 3rem 0;
  }
`;

export const PartnersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h3`
  text-align: center;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 3rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #FF6B6B, #4ECDC4);
    border-radius: 2px;
  }

  @media only screen and (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const LogosContainer = styled.div`
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
`;

export const LogosWrapper = styled.div`
  display: flex;
  animation: ${scroll} 25s linear infinite;
  width: calc(220px * 16);
  
  &:hover {
    animation-play-state: paused;
  }
`;

export const LogoItem = styled.div`
  flex: 0 0 220px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 107, 107, 0.1);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 48px rgba(255, 107, 107, 0.25);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(78, 205, 196, 0.3);
  }

  @media only screen and (max-width: 768px) {
    flex: 0 0 180px;
    height: 80px;
    margin: 0 1rem;
    padding: 1rem;
  }
`;

export const LogoImage = styled.img`
  max-width: 160px;
  max-height: 70px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(50%) opacity(0.8);
  transition: all 0.4s ease;
  border-radius: 8px;

  ${LogoItem}:hover & {
    filter: grayscale(0%) opacity(1);
    transform: scale(1.05);
  }

  @media only screen and (max-width: 768px) {
    max-width: 120px;
    max-height: 50px;
  }
`;
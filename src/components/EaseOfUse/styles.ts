// src/components/EaseOfUse/styles.ts - CRÉER CE FICHIER
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 122, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 40px rgba(0, 122, 255, 0.2);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-10px) scale(1.1);
  }
  60% {
    transform: translateY(-5px) scale(1.05);
  }
`;

export const EaseOfUseSection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 122, 255, 0.3), transparent);
  }

  @media only screen and (max-width: 768px) {
    padding: 80px 0;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Header = styled.div<{ isVisible: boolean }>`
  text-align: center;
  margin-bottom: 80px;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '40px'});
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media only screen and (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

export const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
  letter-spacing: -0.02em;

  @media only screen and (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 414px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;

  @media only screen and (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 500px;
  }

  @media only screen and (max-width: 414px) {
    font-size: 1rem;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }

  @media only screen and (max-width: 414px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

export const FeatureCard = styled.div<{ isVisible: boolean; delay: number }>`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '60px'});
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: forwards;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 122, 255, 0.1);
    animation: ${glow} 2s ease-in-out infinite;
  }

  @media only screen and (max-width: 768px) {
    padding: 35px 25px;
  }

  @media only screen and (max-width: 414px) {
    padding: 30px 20px;
  }
`;

export const GlowEffect = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 122, 255, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;

  ${FeatureCard}:hover & {
    opacity: 1;
  }
`;

export const FeatureIcon = styled.div<{ animateCounters: boolean; delay: number }>`
  font-size: 4rem;
  margin-bottom: 24px;
  opacity: ${props => props.animateCounters ? 1 : 0};
  transform: scale(${props => props.animateCounters ? 1 : 0.5});
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition-delay: ${props => props.delay + 400}ms;

  ${FeatureCard}:hover & {
    animation: ${bounce} 0.6s ease-in-out;
  }

  @media only screen and (max-width: 768px) {
    font-size: 3.5rem;
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 414px) {
    font-size: 3rem;
    margin-bottom: 16px;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  letter-spacing: -0.01em;

  @media only screen and (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 414px) {
    font-size: 1.2rem;
  }
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  font-weight: 400;

  @media only screen and (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media only screen and (max-width: 414px) {
    font-size: 0.9rem;
  }
`;

export const AnimatedCounter = styled.span`
  display: inline-block;
  font-weight: 700;
  color: #007aff;
`;
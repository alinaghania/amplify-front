// src/components/MainFeatures/index.tsx - NOUVEAU COMPOSANT
import React, { useEffect, useRef, useState } from 'react';
import { withTranslation, TFunction } from 'react-i18next';
import styled, { keyframes } from 'styled-components';

// Animations
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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.2);
  }
`;

// Styles
const FeaturesSection = styled.section`
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
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
  }

  @media only screen and (max-width: 768px) {
    padding: 80px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div<{ isVisible: boolean }>`
  text-align: center;
  margin-bottom: 80px;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '40px'});
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media only screen and (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const Title = styled.h2`
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

const Subtitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 24px;
  
  @media only screen and (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: 414px) {
    font-size: 1.3rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;

  @media only screen and (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 600px;
  }

  @media only screen and (max-width: 414px) {
    font-size: 1rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  max-width: 1000px;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    gap: 50px;
  }

  @media only screen and (max-width: 414px) {
    gap: 40px;
  }
`;

const FeatureRow = styled.div<{ isVisible: boolean; delay: number; reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  opacity: ${props => props.isVisible ? 1 : 0};
  animation: ${props => props.isVisible ? 
    (props.reverse ? slideInRight : slideInLeft) : 'none'} 0.8s ease-out;
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: forwards;

  ${props => props.reverse && `
    direction: rtl;
    
    > * {
      direction: ltr;
    }
  `}

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
    direction: ltr !important;
  }
`;

const FeatureContent = styled.div`
  padding: 20px 0;
`;

const FeatureTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  
  @media only screen and (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media only screen and (max-width: 414px) {
    font-size: 1.4rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  
  @media only screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeatureImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    animation: ${pulseGlow} 2s ease-in-out infinite;
  }

  @media only screen and (max-width: 768px) {
    height: 240px;
  }

  @media only screen and (max-width: 414px) {
    height: 200px;
  }
`;

const FeatureIcon = styled.div`
  font-size: 6rem;
  opacity: 0.8;
  
  @media only screen and (max-width: 768px) {
    font-size: 5rem;
  }

  @media only screen and (max-width: 414px) {
    font-size: 4rem;
  }
`;

const FeatureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

// Composant
interface MainFeaturesProps {
  t: TFunction;
}

const MainFeatures: React.FC<MainFeaturesProps> = ({ t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Service client personnalisé",
      description: "Améliorez la satisfaction client avec un support disponible 24/7, capable de gérer des requêtes complexes et de fournir des réponses adaptées à chaque situation.",
      icon: "🎧",
      delay: 0,
      reverse: false
    },
    {
      title: "Prospection commerciale B2B",
      description: "Ciblez vos prospects avec des arguments personnalisés et boostez votre pipeline de ventes grâce à des appels proactifs et stratégiques.",
      icon: "🎯",
      delay: 200,
      reverse: true
    },
    {
      title: "Gestion des rendez-vous",
      description: "Coordonnez facilement les rendez-vous avec des confirmations et rappels automatiques, assurant une organisation parfaite et une meilleure gestion du temps.",
      icon: "📅",
      delay: 400,
      reverse: false
    },
    {
      title: "Prise de commande automatisée",
      description: "Optimisez vos ventes avec une gestion fluide des appels entrants et des commandes, réduisant les erreurs et améliorant la rapidité du service.",
      icon: "🛒",
      delay: 600,
      reverse: true
    },
    {
      title: "Relance client intelligente",
      description: "Ne laissez plus aucune opportunité vous échapper. Relancez vos clients de manière stratégique avec des messages pertinents qui renforcent la fidélité.",
      icon: "🔄",
      delay: 800,
      reverse: false
    },
    {
      title: "Qualification de leads",
      description: "Filtrez et identifiez vos prospects les plus prometteurs grâce à une qualification précise en temps réel, maximisant l'efficacité de vos équipes commerciales.",
      icon: "⭐",
      delay: 1000,
      reverse: true
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <FeaturesSection ref={sectionRef} id="main-features">
      <Container>
        <Header isVisible={isVisible}>
          <Title>Fonctionnalités Principales</Title>
          <Subtitle>Tout ce qu'Amplify peut faire pour vous</Subtitle>
          <Description>
            Nos solutions couvrent tous les aspects de la gestion commerciale : de la prospection 
            jusqu'à la vente et le service client, vous offrant des outils puissants pour améliorer 
            votre efficacité et la satisfaction de vos clients.
          </Description>
        </Header>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureRow
              key={index}
              isVisible={isVisible}
              delay={feature.delay}
              reverse={feature.reverse}
            >
              <FeatureContent>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureContent>
              
              <FeatureImageContainer>
                <FeatureIcon>{feature.icon}</FeatureIcon>
              </FeatureImageContainer>
            </FeatureRow>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
};

export default withTranslation()(MainFeatures);
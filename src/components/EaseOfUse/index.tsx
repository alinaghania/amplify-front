// src/components/EaseOfUse/index.tsx - REMPLACE TOUT LE CONTENU
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

// Styles
const EaseOfUseSection = styled.section`
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

const Subtitle = styled.p`
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 25px;
  }

  @media only screen and (max-width: 414px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FeatureCard = styled.div<{ isVisible: boolean; delay: number }>`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 35px 25px;
  text-align: center;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '60px'});
  animation: ${props => props.isVisible ? fadeInUp : 'none'} 0.8s ease-out;
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: forwards;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 122, 255, 0.1);
    animation: ${glow} 2s ease-in-out infinite;
  }

  @media only screen and (max-width: 768px) {
    padding: 30px 20px;
  }

  @media only screen and (max-width: 414px) {
    padding: 25px 18px;
  }
`;

const GlowEffect = styled.div`
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

const FeatureIcon = styled.div<{ animateCounters: boolean; delay: number }>`
  font-size: 3.5rem;
  margin-bottom: 20px;
  opacity: ${props => props.animateCounters ? 1 : 0};
  transform: scale(${props => props.animateCounters ? 1 : 0.5});
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition-delay: ${props => props.delay + 400}ms;

  ${FeatureCard}:hover & {
    animation: ${bounce} 0.6s ease-in-out;
  }

  @media only screen and (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 18px;
  }

  @media only screen and (max-width: 414px) {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
`;

const FeatureTitle = styled.h3`
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

const FeatureDescription = styled.p`
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

// Composant
interface EaseOfUseProps {
  t: TFunction;
}

const EaseOfUse: React.FC<EaseOfUseProps> = ({ t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateCounters, setAnimateCounters] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: "⏰",
      title: "15 min",
      description: "Installation",
      delay: 0
    },
    {
      icon: "🎨", 
      title: "Sans code",
      description: "Interface visuelle",
      delay: 200
    },
    {
      icon: "🌍",
      title: "Multilingue",
      description: "Toutes les langues",
      delay: 400
    },
    {
      icon: "📊",
      title: "96% satisfaction",
      description: "Clients conquis",
      delay: 600
    },
    {
      icon: "📱",
      title: "Plug & Play", 
      description: "Intégration directe",
      delay: 800
    },
    {
      icon: "🎧",
      title: "Support 24/7",
      description: "Accompagnement",
      delay: 1000
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateCounters(true), 800);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <EaseOfUseSection ref={sectionRef} id="ease-of-use">
      <Container>
        <Header isVisible={isVisible}>
          <Title>Simplicité avant tout</Title>
          <Subtitle>
            Déployez votre agent vocal en quelques minutes, sans compétences techniques.
          </Subtitle>
        </Header>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              isVisible={isVisible}
              delay={feature.delay}
            >
              <GlowEffect />
              <FeatureIcon animateCounters={animateCounters} delay={feature.delay}>
                {feature.icon}
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </EaseOfUseSection>
  );
};

export default withTranslation()(EaseOfUse);
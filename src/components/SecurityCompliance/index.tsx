// src/components/SecurityCompliance/index.tsx - VERSION AMÉLIORÉE
import React, { useEffect, useRef, useState } from 'react';
import { withTranslation, TFunction } from 'react-i18next';
import styled, { keyframes } from 'styled-components';

// Animations cohérentes avec le site
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

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const checkmarkPop = keyframes`
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.3) rotate(0deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

const floatingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styles cohérents avec le design existant
const SecuritySection = styled.section`
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
    background: linear-gradient(90deg, transparent, rgba(26, 26, 26, 0.1), transparent);
  }

  @media only screen and (max-width: 768px) {
    padding: 80px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
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
  max-width: 700px;
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

const ComplianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }

  @media only screen and (max-width: 414px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const ComplianceCard = styled.div<{ isVisible: boolean; delay: number }>`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '60px'});
  animation: ${props => props.isVisible ? fadeInUp : 'none'} 0.8s ease-out;
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: forwards;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    border-color: rgba(26, 26, 26, 0.1);
    animation: ${floatingAnimation} 2s ease-in-out infinite;
  }

  @media only screen and (max-width: 768px) {
    padding: 35px 25px;
  }

  @media only screen and (max-width: 414px) {
    padding: 30px 20px;
  }
`;

const ComplianceIcon = styled.div<{ animateCheck: boolean; delay: number }>`
  font-size: 3.5rem;
  margin-bottom: 24px;
  position: relative;
  opacity: ${props => props.animateCheck ? 1 : 0};
  transform: scale(${props => props.animateCheck ? 1 : 0.5});
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition-delay: ${props => props.delay + 400}ms;

  @media only screen and (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 414px) {
    font-size: 2.5rem;
    margin-bottom: 16px;
  }
`;

const CheckMark = styled.div<{ animateCheck: boolean; delay: number }>`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  opacity: ${props => props.animateCheck ? 1 : 0};
  animation: ${props => props.animateCheck ? checkmarkPop : 'none'} 0.6s ease-out;
  animation-delay: ${props => props.delay + 800}ms;
  animation-fill-mode: forwards;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

  @media only screen and (max-width: 414px) {
    width: 20px;
    height: 20px;
    font-size: 12px;
    top: -6px;
    right: -6px;
  }
`;

const ComplianceTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  letter-spacing: -0.01em;

  @media only screen and (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 414px) {
    font-size: 1.1rem;
  }
`;

const ComplianceDescription = styled.p`
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

const TrustBadges = styled.div<{ isVisible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '40px'});
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s;

  @media only screen and (max-width: 768px) {
    gap: 20px;
  }
`;

const TrustBadge = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(26, 26, 26, 0.1);
  border-radius: 12px;
  padding: 12px 20px;
  font-weight: 500;
  color: #1a1a1a;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #1a1a1a;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media only screen and (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.8rem;
  }
`;

// Composant
interface SecurityComplianceProps {
  t: TFunction;
}

const SecurityCompliance: React.FC<SecurityComplianceProps> = ({ t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateCheck, setAnimateCheck] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const compliances = [
    {
      icon: "🔒",
      title: "RGPD Certifié",
      description: "Conformité européenne stricte",
      delay: 0
    },
    {
      icon: "🇫🇷",
      title: "Hébergement France",
      description: "Données sécurisées en France",
      delay: 200
    },
    {
      icon: "🛡️",
      title: "Chiffrement SSL",
      description: "Sécurité niveau bancaire",
      delay: 400
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateCheck(true), 1000);
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
    <SecuritySection ref={sectionRef} id="security-compliance">
      <Container>
        <Header isVisible={isVisible}>
          <Title>Sécurité & Conformité</Title>
          <Subtitle>
            Votre confiance est notre priorité. Amplify respecte les plus hauts standards de sécurité.
          </Subtitle>
        </Header>

        <ComplianceGrid>
          {compliances.map((item, index) => (
            <ComplianceCard
              key={index}
              isVisible={isVisible}
              delay={item.delay}
            >
              <ComplianceIcon animateCheck={animateCheck} delay={item.delay}>
                {item.icon}
                <CheckMark animateCheck={animateCheck} delay={item.delay}>
                  ✓
                </CheckMark>
              </ComplianceIcon>
              <ComplianceTitle>{item.title}</ComplianceTitle>
              <ComplianceDescription>{item.description}</ComplianceDescription>
            </ComplianceCard>
          ))}
        </ComplianceGrid>

        <TrustBadges isVisible={isVisible}>
          <TrustBadge>✅ ANSSI Recommandé</TrustBadge>
          <TrustBadge>🏆 500+ Entreprises nous font confiance</TrustBadge>
          <TrustBadge>⚡ 99.9% de disponibilité</TrustBadge>
        </TrustBadges>
      </Container>
    </SecuritySection>
  );
};

export default withTranslation()(SecurityCompliance);
// src/components/PartnersBanner/index.tsx - CRÉE CE FICHIER AVEC CE CODE
import React from 'react';
import { withTranslation, TFunction } from 'react-i18next';
import {
  PartnersSection,
  PartnersContainer,
  Title,
  LogosContainer,
  LogosWrapper,
  LogoItem,
  LogoImage
} from './styles';

interface Partner {
  name: string;
  logo: string;
}

interface PartnersBannerProps {
  t: TFunction;
}

const partners: Partner[] = [
  { name: 'Crous', logo: 'crous.png' },
  { name: 'Dominos Pizza', logo: 'dominos_pizza.png' },
  { name: 'Kalz Burger', logo: 'kalz-brgr.png' },
  { name: 'Pizza Hut', logo: 'pizza_hut.jpg' },
  { name: 'Pizza Time', logo: 'pizza_time.png' },
  { name: 'Pizza Wood', logo: 'pizza-wood.png' },
  { name: 'Pizzeria Auth', logo: 'pizzeria_auth.png' },
  { name: 'Terminal Burger', logo: 'terminal_burger.jpeg' },
];

const PartnersBanner: React.FC<PartnersBannerProps> = ({ t }) => {
  return (
    <PartnersSection>
      <PartnersContainer>
        <Title>{t('Our Partners')}</Title>
        <LogosContainer>
          <LogosWrapper>
            {partners.map((partner, index) => (
              <LogoItem key={`${partner.name}-${index}`}>
                <LogoImage
                  src={`/img/partners/${partner.logo}`}
                  alt={partner.name}
                  loading="lazy"
                />
              </LogoItem>
            ))}
            {/* Dupliquer pour effet continu */}
            {partners.map((partner, index) => (
              <LogoItem key={`${partner.name}-duplicate-${index}`}>
                <LogoImage
                  src={`/img/partners/${partner.logo}`}
                  alt={partner.name}
                  loading="lazy"
                />
              </LogoItem>
            ))}
          </LogosWrapper>
        </LogosContainer>
      </PartnersContainer>
    </PartnersSection>
  );
};

export default withTranslation()(PartnersBanner);


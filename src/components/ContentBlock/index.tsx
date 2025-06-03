// src/components/ContentBlock/index.tsx - REMPLACE TOUT LE CONTENU
import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";
import { withTranslation } from "react-i18next";

import { ContentBlockProps } from "./types";
import { Button } from "../../common/Button";
import { SvgIcon } from "../../common/SvgIcon";
import {
  ContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
  StyledRow,
  ButtonWrapper,
  RoundedImageWrapper, 
} from "./styles";

const ContentBlock = ({
  icon,
  title,
  content,
  section,
  button,
  t,
  id,
  direction,
}: ContentBlockProps) => {
  const scrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
      console.log('✅ Scroll vers:', targetId);
    } else {
      console.warn('⚠️ Élément non trouvé:', targetId);
    }
  };

  const handleButtonClick = (buttonTitle: string) => {
    const lowerTitle = buttonTitle.toLowerCase();
    
    // Si c'est "Demander une démo" ou "demo" -> Calendly
    if (lowerTitle.includes('demo') || lowerTitle.includes('démo')) {
      console.log('🗓️ Redirection vers Calendly');
      window.open('https://calendly.com/alinaghani13/30min', '_blank');
    }
    // Si c'est "En savoir plus" ou "Learn more" -> scroll vers about
    else if (lowerTitle.includes('savoir') || lowerTitle.includes('learn') || lowerTitle.includes('more')) {
      scrollTo('about');
    }
    // Par défaut -> scroll vers about
    else {
      scrollTo('about');
    }
  };

  //  Détermine si l'image doit être arrondie 
  const shouldRoundImage = icon === "mission.jpeg" || icon === "pic_alina_calling.jpeg" || icon === "calling.jpg";

  return (
    <ContentSection>
      <Fade direction={direction} triggerOnce>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
          <Col lg={11} md={11} sm={12} xs={24}>
            <RoundedImageWrapper shouldRound={shouldRoundImage}>
              <SvgIcon src={icon} width="100%" height="100%" />
            </RoundedImageWrapper>
          </Col>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              {direction === "right" ? (
                <ButtonWrapper>
                  {typeof button === "object" &&
                    button.map(
                      (
                        item: {
                          color?: string;
                          title: string;
                        },
                        index: number
                      ) => {
                        return (
                          <Button
                            key={index}
                            color={item.color}
                            onClick={() => handleButtonClick(item.title)}
                          >
                            {t(item.title)}
                          </Button>
                        );
                      }
                    )}
                </ButtonWrapper>
              ) : (
                <ServiceWrapper>
                  <Row justify="space-between">
                    {typeof section === "object" &&
                      section.map(
                        (
                          item: {
                            title: string;
                            content: string;
                            icon: string;
                          },
                          index: number
                        ) => {
                          return (
                            <Col key={index} span={11}>
                              <SvgIcon
                                src={item.icon}
                                width="60px"
                                height="60px"
                              />
                              <MinTitle>{t(item.title)}</MinTitle>
                              <MinPara>{t(item.content)}</MinPara>
                            </Col>
                          );
                        }
                      )}
                  </Row>
                </ServiceWrapper>
              )}
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default withTranslation()(ContentBlock);
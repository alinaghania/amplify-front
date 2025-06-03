// src/components/MiddleBlock/index.tsx - REMPLACE TOUT LE CONTENU
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";

interface MiddleBlockProps {
  title: string;
  content: string;
  button: any;
  t: any;
}

const MiddleBlock = ({ title, content, button, t }: MiddleBlockProps) => {
  const handleButtonClick = (buttonTitle: string) => {
    const lowerTitle = buttonTitle.toLowerCase();
    
    // Si c'est "Demander une démo" ou "demo" -> Calendly
    if (lowerTitle.includes('demo') || lowerTitle.includes('démo')) {
      console.log('🗓️ Redirection MiddleBlock vers Calendly');
      window.open('https://calendly.com/alinaghani13/30min', '_blank');
    }
    // Autres boutons -> scroll vers contact
    else {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <MiddleBlockSection>
      <Slide direction="up" triggerOnce>
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              {button && (
                <Button 
                  name="submit" 
                  onClick={() => handleButtonClick(button)}
                  color="demo"  // Style Chanel Classic aussi
                >
                  {t(button)}
                </Button>
              )}
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </MiddleBlockSection>
  );
};

export default withTranslation()(MiddleBlock);
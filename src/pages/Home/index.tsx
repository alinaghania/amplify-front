// src/pages/Home/index.tsx - STRUCTURE FINALE OPTIMISÉE
import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const PartnersBanner = lazy(() => import("../../components/PartnersBanner"));
const AudioPlayer = lazy(() => import("../../components/AudioPlayer"));
const EaseOfUse = lazy(() => import("../../components/EaseOfUse"));
const SecurityCompliance = lazy(() => import("../../components/SecurityCompliance"));
const MainFeatures = lazy(() => import("../../components/MainFeatures"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      
      {/* 1. 🚀 ACCROCHE PRINCIPALE */}
      <ContentBlock
        direction="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="dashbord.jpeg"
        id="intro"
      />
      
      {/* 2. 🤝 PARTNERS BANNER */}
      <PartnersBanner />
      
      {/* 3. 👥 QUI SOMMES-NOUS ? */}
      <ContentBlock
        direction="left"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="tracking.jpeg"
        id="about"
      />
      
      {/* 4. 🎯 NOTRE MISSION */}
      <ContentBlock
        direction="right"
        title={MissionContent.title}
        content={MissionContent.text}
        icon="mission.jpeg"
        id="mission"
      />
      
      {/* 5. 💼 CE QUE FAIT AMPLIFY */}
      <ContentBlock
        direction="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="calling.jpg"
        id="product"
      />
      
      {/* 6. ⚡ FONCTIONNALITÉS PRINCIPALES */}
      <MainFeatures />
      
      {/* 7. 🚀 PASSEZ À LA VITESSE SUPÉRIEURE */}
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
      />
      
      {/* 8. 🎨 SIMPLICITÉ AVANT TOUT */}
      <EaseOfUse />
      
      {/* 9. 🛡️ SÉCURITÉ & CONFORMITÉ */}
      <SecurityCompliance />
      
      {/* 10. 📞 CONTACTEZ-NOUS */}
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
      
      {/* 11. 🎵 AUDIO PLAYER */}
      <AudioPlayer />
    </Container>
  );
};

export default Home;
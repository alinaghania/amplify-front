// src/pages/Home/index.tsx - STRUCTURE SANS DOUBLONS
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

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      
      {/* 1. 🎯 ACCROCHE + DÉMO */}
      <ContentBlock
        direction="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="dashbord.jpeg"
        id="intro"
      />
      
      {/* 2. 🤝 SOCIAL PROOF */}
      <PartnersBanner />
      
      {/* 3. 🚀 CALL TO ACTION */}
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
      />
      
      {/* 4. 📖 À PROPOS */}
      <ContentBlock
        direction="left"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="tracking.jpeg"
        id="about"
      />
      
      {/* 5. 🎤 NOTRE MISSION */}
      <ContentBlock
        direction="right"
        title={MissionContent.title}
        content={MissionContent.text}
        icon="mission.jpeg"
        id="mission"
      />
      
      {/* 6. 💼 NOTRE PRODUIT */}
      <ContentBlock
        direction="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="calling.jpg"
        id="product"
      />
      
      {/* 7. ⚡ FACILITÉ D'UTILISATION */}
      <EaseOfUse />
      
      {/* 8. 🛡️ SÉCURITÉ & CONFIANCE */}
      <SecurityCompliance />
      
      {/* 9. 📞 CONTACT (final call-to-action) */}
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
      
      {/* 10. 🎵 AUDIO PLAYER */}
      <AudioPlayer />
    </Container>
  );
};

export default Home;
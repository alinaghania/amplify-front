// src/components/AudioPlayer/index.tsx - REMPLACE TOUT LE CONTENU
import React, { useState, useRef, useEffect } from 'react';
import { withTranslation, TFunction } from 'react-i18next';
import {
  AudioPlayerContainer,
  AudioPopup,
  AudioHeader,
  CloseButton,
  AudioTitle,
  AudioSubtitle,
  AudioControls,
  PlayButton,
  TimeDisplay,
  ProgressBar,
  ProgressBarFilled,
  VolumeControl,
  TriggerButton,
  PhoneIcon,
  VolumeToggle
} from './styles';

interface AudioPlayerProps {
  t: TFunction;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer manuel pour forcer la mise à jour
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          const time = Math.floor(audioRef.current.currentTime);
          setCurrentTime(time);
          console.log('⏰ Timer:', time, 'secondes');
        }
      }, 500); // Mise à jour toutes les 500ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const dur = Math.floor(audio.duration);
        setDuration(dur);
        console.log('📐 Durée totale:', dur, 'secondes');
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      console.log('🏁 Audio terminé');
    };

    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.volume = isMuted ? 0 : 0.7;

    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        console.log('⏸️ Audio en pause');
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
        console.log('▶️ Audio en lecture');
      }
    } catch (error) {
      console.error('❌ Erreur de lecture:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.volume = newMuted ? 0 : 0.7;
    console.log('🔊 Son:', newMuted ? 'COUPÉ' : 'ACTIVÉ');
  };

  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <AudioPlayerContainer>
      {/* Bouton flottant pour ouvrir */}
      <TriggerButton onClick={() => setIsOpen(true)}>
        <PhoneIcon>📞</PhoneIcon>
        {t('Écouter la démo')}
      </TriggerButton>

      {/* Popup Audio Player */}
      {isOpen && (
        <AudioPopup>
          <AudioHeader>
            <div>
              <AudioTitle>{t('Amplify vous appelle')}</AudioTitle>
              <AudioSubtitle>{t('Écouter notre agent vocal')}</AudioSubtitle>
            </div>
            <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
          </AudioHeader>

          <AudioControls>
            <PlayButton onClick={togglePlay} isPlaying={isPlaying} disabled={isLoading}>
              {isLoading ? '⏳' : (isPlaying ? '⏸️' : '▶️')}
            </PlayButton>
            
            <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
            
            {/* Barre de progression désactivée */}
            <ProgressBar style={{ cursor: 'default', opacity: 0.5 }}>
              <ProgressBarFilled progress={0} />
            </ProgressBar>
            
            <TimeDisplay>{formatTime(duration)}</TimeDisplay>
            
            <VolumeControl>
              <VolumeToggle onClick={toggleMute} isMuted={isMuted}>
                {isMuted ? 'OFF' : 'ON'}
              </VolumeToggle>
            </VolumeControl>
          </AudioControls>

          <audio
            ref={audioRef}
            preload="metadata"
            src="/audio/demo-voice-agent.mp3"
          >
            Votre navigateur ne supporte pas l'élément audio.
          </audio>
        </AudioPopup>
      )}
    </AudioPlayerContainer>
  );
};

export default withTranslation()(AudioPlayer);
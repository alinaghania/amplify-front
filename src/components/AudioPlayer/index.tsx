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
      }, 500);
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
      console.log('🔍 Debug durée - audio.duration:', audio.duration);
      console.log('🔍 Debug durée - readyState:', audio.readyState);
      console.log('🔍 Debug durée - src:', audio.src);
      
      if (audio.duration && !isNaN(audio.duration)) {
        const dur = Math.floor(audio.duration);
        setDuration(dur);
        console.log('✅ Durée définie:', dur, 'secondes');
      } else {
        console.log('❌ Durée non disponible - Tentative de rechargement...');
        // Force le rechargement si pas de durée
        audio.load();
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      console.log('🏁 Audio terminé');
    };

    const handleError = (e: any) => {
      console.error('❌ Erreur audio:', e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    // Plus d'événements pour capturer la durée
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadeddata', updateDuration);
    audio.addEventListener('canplay', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    audio.volume = isMuted ? 0 : 0.7;

    // Force le chargement initial quand on ouvre
    if (isOpen && audio.readyState === 0) {
      console.log('🔄 Force le chargement initial');
      audio.load();
    }

    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadeddata', updateDuration);
      audio.removeEventListener('canplay', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [isMuted, isOpen]);

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

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration || duration === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(Math.floor(newTime));
    console.log('🎯 Saut à:', Math.floor(newTime), 'secondes');
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

  // CALCUL SIMPLE DE LA PROGRESSION AVEC DEBUG
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  console.log('📊 Progression:', progress.toFixed(1), '% - currentTime:', currentTime, 'duration:', duration);

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
            
            {/* BARRE DE PROGRESSION CLIQUABLE */}
            <ProgressBar onClick={handleProgressClick} style={{ cursor: 'pointer' }}>
              <ProgressBarFilled progress={progress} />
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
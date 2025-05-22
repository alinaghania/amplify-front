// src/components/AudioPlayer/index.tsx - CRÉE CE FICHIER AVEC L'EXTENSION .tsx
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
  PhoneIcon
} from './styles';

interface AudioPlayerProps {
  t: TFunction;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

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
            <PlayButton onClick={togglePlay} isPlaying={isPlaying}>
              {isPlaying ? '⏸️' : '▶️'}
            </PlayButton>
            
            <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
            
            <ProgressBar onClick={handleProgressClick}>
              <ProgressBarFilled progress={progress} />
            </ProgressBar>
            
            <TimeDisplay>{formatTime(duration)}</TimeDisplay>
            
            <VolumeControl>
              🔊
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
              />
            </VolumeControl>
          </AudioControls>

          <audio
            ref={audioRef}
            src="/audio/demo-voice-agent.mp3"
            preload="metadata"
          />
        </AudioPopup>
      )}
    </AudioPlayerContainer>
  );
};

export default withTranslation()(AudioPlayer);
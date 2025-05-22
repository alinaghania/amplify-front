// src/components/AudioPlayer/styles.ts 
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
  }
`;

export const AudioPlayerContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;

  @media only screen and (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

export const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 16px 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4);
  transition: all 0.3s ease;
  animation: ${pulse} 3s infinite;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(255, 107, 107, 0.5);
    animation: none;
  }

  @media only screen and (max-width: 768px) {
    padding: 12px 16px;
    font-size: 12px;
  }
`;

export const PhoneIcon = styled.span`
  font-size: 20px;
  animation: ${pulse} 2s infinite;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const AudioPopup = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 400px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 24px;
  animation: ${fadeIn} 0.3s ease-out;

  @media only screen and (max-width: 768px) {
    width: 320px;
    right: 20px;
    bottom: 80px;
    padding: 20px;
  }

  @media only screen and (max-width: 480px) {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
  }
`;

export const AudioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const AudioTitle = styled.h3`
  color: #1E293B;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 4px 0;
  line-height: 1.2;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const AudioSubtitle = styled.p`
  color: #64748B;
  font-size: 14px;
  margin: 0;
  line-height: 1.4;

  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #64748B;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.1);
    color: #FF6B6B;
  }
`;

export const AudioControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(30, 41, 59, 0.05);
  border-radius: 16px;
  padding: 16px;

  @media only screen and (max-width: 768px) {
    gap: 8px;
    padding: 12px;
  }
`;

export const PlayButton = styled.button<{ isPlaying: boolean }>`
  background: ${({ isPlaying }) => isPlaying ? '#4ECDC4' : '#FF6B6B'};
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  @media only screen and (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
`;

export const TimeDisplay = styled.span`
  color: #1E293B;
  font-size: 12px;
  font-weight: 600;
  font-family: monospace;
  min-width: 35px;

  @media only screen and (max-width: 768px) {
    font-size: 11px;
    min-width: 30px;
  }
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(30, 41, 59, 0.1);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    height: 8px;
  }

  transition: height 0.2s ease;
`;

export const ProgressBarFilled = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%);
  border-radius: 3px;
  width: ${({ progress }) => progress}%;
  transition: width 0.1s ease;
`;

export const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  input[type="range"] {
    width: 60px;
    height: 4px;
    background: rgba(30, 41, 59, 0.1);
    border-radius: 2px;
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #FF6B6B;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    &::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #FF6B6B;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
  }

  @media only screen and (max-width: 768px) {
    input[type="range"] {
      width: 40px;
    }
  }
`;
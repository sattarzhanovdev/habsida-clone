import React from "react";
import { useReactMediaRecorder } from 'react-media-recorder';
import cls from './Recording.module.scss'
import { BiMicrophone, BiStop, BiPlay } from 'react-icons/bi'
import { ImLoop2 } from 'react-icons/im'
 
const Recording = () => {
  const [isActive, setIsActive] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [text, setText] = React.useState('');
  
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true
  });

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.mediaBlobUrl);

    reader.onload = () =>
    resolve({
      fileName: file.title,
      base64: reader.result
    });
    reader.onerror = reject;
  });


  return (
    <div className={cls.recording}>
      <button
        onClick={() => startRecording()}
        className={mediaBlobUrl ? cls.none : ''}
      >
        <BiMicrophone />
      </button>
      <button
        onClick={() => {
          stopRecording()
          setText('')
        }}
      >
        <BiStop />
      </button>
      <audio 
        src={mediaBlobUrl && mediaBlobUrl}
        autoPlay
        controls
        preload="auto"
        id="start"
      >
        <source src={mediaBlobUrl && mediaBlobUrl}/>
      </audio>
      <button
        onClick={() => {
          document.querySelector('#start').play()
        }}
      >
        <BiPlay />
      </button>
      <button
        onClick={() => {
          startRecording()
          setText('Recording started')
        }}
      >
        <ImLoop2 />
      </button>
      <p>
        {text}
      </p>
    </div>
  )
}

export default Recording;
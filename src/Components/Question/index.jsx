import React from 'react'
import cls from './Question.module.scss'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { IoText } from 'react-icons/io5'
import { BiUserCircle } from 'react-icons/bi'
import { useSpeechSynthesis } from 'react-speech-kit'
import { BiMicrophone, BiStop, BiPlay } from 'react-icons/bi'
import useSpeechToText from 'react-hook-speech-to-text'
import { useReactMediaRecorder } from 'react-media-recorder';
import { Api } from '../../Api'

const Question = () => {
  const {speak} = useSpeechSynthesis()
  const [isSubtitleActive, setIsSubtitleActive] = React.useState(false);
  const [value, setValue] = React.useState('');

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

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const next__func = () => {
    Api.sendAnswer(value)
  }


  React.useEffect(() => {
    interimResult && setValue(interimResult)
  }, [interimResult])
  return (
    <div className={cls.question}>
      <h2>Question</h2>
      <div className={cls.question__block}>
        <div className={cls.card}>
          <div className={cls.up}>
            <h2 className={cls.icon}><AiOutlineQuestionCircle /></h2>
            <h2>HR</h2>
          </div>
          <div className={cls.down}>
            <button onClick={() => speak({ text: 'Tell me about your hobbies' })}> Listen the question </button>
          </div>
        </div>
        <div className={cls.card}>
          <div className={cls.up}>
            <h2 className={cls.icon}><IoText /></h2>
            <h2>Question on text</h2>
          </div>
          <div className={cls.down}>
            <p>
              {
                isSubtitleActive ? 'Tell me about your hobbies' : ''
              }
            </p>
            <button 
              onClick={() => setIsSubtitleActive(!isSubtitleActive)}
            >
              {isSubtitleActive ? 'Hide the subtitle' : 'Show the subtitle'}
            </button>
          </div>
        </div>
        <div className={cls.card}>
          <div className={cls.up}>
            <h2 className={cls.icon}><BiUserCircle /></h2>
            <h2>Answer</h2>
          </div>
          <div className={cls.down}>
            <div className={cls.answer__audio}>
              <div className={cls.btns__audio}>
                <button
                  onClick={() => {
                    startRecording()
                    startSpeechToText()
                  }}
                >
                  <BiMicrophone />
                </button>
                <button
                  onClick={() => {
                    stopRecording()
                    stopSpeechToText()
                  }}
                >
                  <BiStop />
                </button>
              </div>
                {interimResult && <p>{interimResult}</p>}
              <audio 
                src={mediaBlobUrl && mediaBlobUrl}
                controls
                autoPlay
                className={mediaBlobUrl ? '' : cls.none}
              >
                <source src={mediaBlobUrl && mediaBlobUrl}/>
              </audio>
            </div>
          </div>
        </div>
      </div>
      <button 
        className={cls.next__btn}
        onClick={() => next__func()}
      >
        Next
      </button>
    </div>
  )
}

export default Question;
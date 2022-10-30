import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const voices = window.speechSynthesis.getVoices();

function StringInput(props: { val: string, setVal: (s: string) => void }) {
  return <input
    type="text"
    value={props.val}
    onInput={e => {
      props.setVal(e.currentTarget.value);
    }}
  ></input>
}

function NumberInput(props: { val: number, setVal: (s: number) => void }) {
  return <input
    type="number"
    value={props.val.toString()}
    onInput={e => {
      props.setVal(Number(e.currentTarget.value));
    }}
  ></input>
}


function speak(params: {
  pitch: number,
  duration: number,
  text: string,
  voiceName: string
}) {
  let s = new SpeechSynthesisUtterance(params.text);
  s.pitch = params.pitch;
  s.rate = 1 / params.duration;
  s.voice = voices.find(v => v.name == params.voiceName) ?? s.voice;
  speechSynthesis.speak(s);
}


function VoiceSelector(props: { val: string, setVal: (s: string) => void }) {
  return <select
    onChange={e => {
      props.setVal(e.currentTarget.value);
    }}
  >
    { voices.map(v => {
      return <option
        key={v.name}
        value={v.name}
      >{v.name} (${v.lang})</option>
    }) }
  </select>
}


function App() {
  const [fields, setFields] = useState({
    pitch: 1,
    duration: 1,
    text: "this is text to speech",
    voiceName: "" 
  });

  function setField<T extends keyof (typeof fields)>(field: T) {
    return (newVal: (typeof fields)[T]) => {
      setFields({
        ...fields,
        [field]: newVal
      });
    }
  }

  return (
    <div className="App">
      <StringInput val={fields.text} setVal={setField("text")}></StringInput>
      <NumberInput val={fields.pitch} setVal={setField("pitch")}></NumberInput>
      <NumberInput val={fields.duration} setVal={setField("duration")}></NumberInput>
      <VoiceSelector val={fields.voiceName} setVal={setField("voiceName")}></VoiceSelector>
      <button
        onClick={e => {
          speak(fields);
        }}
      >Speak</button>
    </div>
  )
}

export default App

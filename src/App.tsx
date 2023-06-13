import React, {useEffect, useState} from 'react';
import './App.css';
import {useAudioRecorder} from "react-audio-voice-recorder";
import uploadFile from "./functions/upload";
import useWebSocket from "./hooks/useWebSocket";

function App() {
    const {
        startRecording,
        stopRecording,
        recordingBlob,
        isRecording,
        // recordingTime
    } = useAudioRecorder()

    useEffect(() => {
        if(recordingBlob != null) {
            uploadFile(recordingBlob)
        }
    }, [recordingBlob])

    useWebSocket({
        action: 'set-time',
        callback: (data) => {
            console.log(new Date(data.value.time).getTime() - new Date().getTime())
            setTimeout(() => {
                startRecording()
            }, new Date(data.value.time).getTime() - new Date().getTime())
        }
    })

    const [startTime, setStartTime] = useState<Date>(new Date())

    return (
        <div className="App">
            {
                isRecording
                    ? <button
                        onClick={stopRecording}
                    >
                        STOP
                    </button>
                    : <button
                        onClick={startRecording}
                    >
                        START
                    </button>
            }
            <br/>
            <input type="time" onChange={(e) => {
                setStartTime(new Date(new Date().toDateString() + ' ' + e.target.value))
            }}/>
            <br/>
            <button onClick={() => {
                // setTimeout(startRecording, startTime.getTime() - new Date().getTime())
                fetch(`${process.env.REACT_APP_API_URL}/setTime`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        time: startTime
                    })
                })
            }}>
                SET TIMER
            </button>
        </div>
    );
}

export default App;

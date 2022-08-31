import React, { useEffect, useState } from 'react'
import './ClockView.css'


const ClockView = () => {

	const [breakLength, setBreakLength] = useState(5)
	const [sessionLength, setSessionLength] = useState(25)
	const [timeLeft, setTimeLeft] = useState("25:00")

	const [count, setCount] = useState(0)
	const [intervalID, setIntervalID] = useState(0)

	const minMinutes = 0;
	const maxMinutes = 60;

	// logic for reset
	const reset = () => {
		clearInterval(intervalID);
		setIntervalID(0)

		setBreakLength(5)
		setSessionLength(25)
		setTimeLeft("25:00")
		setCount(0)
	}

	const breakIncrement = () => {
		if (breakLength >= minMinutes && breakLength < maxMinutes)
			setBreakLength(breakLength + 1)
	}

	const breakDecrement = () => {
		if (breakLength > minMinutes && breakLength <= maxMinutes)
			setBreakLength(breakLength - 1)
	}
	
	const sessionIncrement = () => {
		if (sessionLength >= minMinutes && sessionLength < maxMinutes){
			setSessionLength(sessionLength + 1)
			setTimeLeft(`${sessionLength + 1}:00`)
		}
	}
	
	const sessionDecrement = () => {
		if (sessionLength > minMinutes && sessionLength <= maxMinutes){
			setSessionLength(sessionLength - 1)
			setTimeLeft(`${sessionLength - 1 }:00`)
		}
	}

	const toggleStartStop = () => {

		if(intervalID){
			clearInterval(intervalID);
			setIntervalID(0)
			// reset()
			return
		}
		// let timer: number = 5000;
		let timer: number = sessionLength * 60 * 1000;

		let minutes, seconds = 0

		const newIntervalId:any = setInterval(()=>{

			minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
			seconds = Math.floor((timer % (1000 * 60)) / 1000);
			
			let minStr:any = minutes
			let secStr:any = seconds

			if(minutes < 10){
				minStr = `0${minutes}`
			}

			if(seconds < 10){
				secStr = `0${seconds}`
			}

			setTimeLeft(`${minStr}:${secStr}`)

			timer -= 1000
			if (timer < 0) {
				clearInterval(newIntervalId)
			}
		}, 1000)

		setIntervalID(newIntervalId)
	}

	useEffect(() => {
	  console.log(sessionLength)
	}, [sessionLength])
	

	return (
		<div className='w-1/2 mx-auto p-6 border'>
			<div>
				<div id="break-label">Break Length</div>
				<button id="break-decrement" onClick={() => breakDecrement()}>Down</button>
				<div id="break-length">{breakLength}</div>
				<button id="break-increment" onClick={() => breakIncrement()}>Up</button>
			</div>
			<hr />
			<div>
				<div id="session-label">Session Length</div>
				<button id="session-decrement" onClick={() => sessionDecrement()}>Down</button>
				<div id="session-length">{sessionLength}</div>
				<button id="session-increment" onClick={() => sessionIncrement()}>Up</button>
			</div>
			<hr />
			<div>
				<div id="timer-label">Session</div>
				{/* format mm:ss */}
				<div id="time-left">{timeLeft}</div>
			</div>
			<hr />
			<div>
				<button id="start_stop" onClick={() => toggleStartStop()}>Start / Stop</button>
				<button id="reset" onClick={() => reset()}>Reset</button>
				<p className='text-slate-600'>{count}</p>
			</div>
		</div>
	)
}

export default ClockView
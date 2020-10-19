import React, { useState } from 'react'
import BPMDisplay from './components/BPMDisplay'

const App = () => {
	const [ lastTap, setLastTap ] = useState(null)
	const [ intervals, setIntervals ] = useState([])  // intervals between taps, in milliseconds
	const [ bpm, setBpm ] = useState(0)
	const [ resetDuration, setResetDuration ] = useState(2)

	const resetCounter = message => {
		setBpm(message)
		setIntervals([])
	}

	const handleTap = () => {
		if (!lastTap || (new Date() - lastTap > resetDuration * 1000)) {
			resetCounter('First Beat')
		} else {
			const newIntervals = intervals.concat(new Date() - lastTap)
			setIntervals(newIntervals)
			
			if (newIntervals.length > 0) {
				const sumIntervals = newIntervals.reduce((total, currentValue) => total + currentValue, 0)
				setBpm((60000 / (sumIntervals / newIntervals.length)).toFixed(2))
			}
		}

		setLastTap(new Date())
	}

	const handleResetDurationChange = event => setResetDuration(event.target.value)

	const handleClickReset = () => resetCounter('')

	// render
	return (
		<div className="App">
			<button onClick={handleTap}>Start tapping to measure BPM</button>
			<BPMDisplay bpm={bpm} />
			<div>
				Pause <input type="number" value={resetDuration} onChange={handleResetDurationChange} /> seconds or <button onClick={handleClickReset}>RESET</button> to start again
			</div>
		</div>
	)
}

export default App

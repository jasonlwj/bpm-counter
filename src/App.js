import React, { useState } from 'react'
import BPMDisplay from './components/BPMDisplay'

const App = () => {
	const [ lastTap, setLastTap ] = useState(null)
	const [ intervals, setIntervals ] = useState([])  // intervals between taps, in milliseconds
	const [ bpm, setBpm ] = useState(0)

	const handleTap = () => {
		if (!lastTap) {
			setBpm('First Beat')
		} else if (new Date() - lastTap > 2000) {
			// reset after inactivity
			setBpm('First Beat')
			setIntervals([])
		} else {
			const newIntervals = intervals.concat(new Date() - lastTap)
			setIntervals(newIntervals)
			
			if (newIntervals.length > 0) {
				const sumIntervals = newIntervals.reduce((total, currentValue) => total + currentValue, 0)
				setBpm((60000 / (sumIntervals / newIntervals.length)).toFixed(2))
			}
		}

		// TODO: reset interval list after set amount of time

		setLastTap(new Date())
	}

	// render
	return (
		<div className="App">
			<button onClick={handleTap}>Start tapping to measure BPM</button>
			<BPMDisplay bpm={bpm} />
		</div>
	)
}

export default App

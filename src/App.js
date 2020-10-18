import React, { useState } from 'react'

const BPMDisplay = ({ bpm }) => {
	return (
		<div>
			<b>{bpm.toFixed(2)}</b>
		</div>
	)
}

const App = () => {
	const [ lastTap, setLastTap ] = useState(null)
	const [ intervals, setIntervals ] = useState([])  // intervals between taps, in milliseconds
	const [ bpm, setBpm ] = useState(0)

	const handleTap = () => {
		if (lastTap) {
			setIntervals(intervals.concat(new Date() - lastTap))
			const sumIntervals = intervals.reduce((total, currentValue) => total + currentValue, 0)
			
			if (intervals.length > 0)
				setBpm(60000 / (sumIntervals / intervals.length))
		}

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
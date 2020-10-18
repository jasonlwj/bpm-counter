import React, { useState } from 'react'

const BPMDisplay = ({ bpm }) => {
	return (
		<div>
			<b>{bpm}</b>
		</div>
	)
}

const App = () => {
	const [ lastTap, setLastTap ] = useState(null)
	const [ intervals, setIntervals ] = useState([])  // intervals between taps, in milliseconds
	const [ bpm, setBpm ] = useState(0)

	const handleTap = () => {
		console.log('calling handleTap()')
		if (!lastTap) {
			setBpm('First Beat')
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

	// render
	return (
		<div className="App">
			<button onClick={handleTap}>Start tapping to measure BPM</button>
			<BPMDisplay bpm={bpm} />
		</div>
	)
}

export default App
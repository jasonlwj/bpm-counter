const average = document.querySelector('#average')
const nearestwhole = document.querySelector('#nearestwhole')
const message = document.querySelector('#message')

const intervals = []
let averageBpm = 0
let lastTap = null

const resetCounter = () => {
	intervals.length = 0
}

const updateMessage = () => {
	// display a message based on the bpm value
	if (averageBpm >= 90 && averageBpm <= 110) {
		message.innerHTML = 'Feels like a dancehall riddim.'
	} else if (averageBpm >= 120 && averageBpm <= 130) {
		message.innerHTML = 'Feels like an average 4-on-the-floor house track.'
	} else if (averageBpm >= 160 && averageBpm <= 180) {
		message.innerHTML = 'Feels like drum and bass.'
	} else if (averageBpm >= 195) {
		message.innerHTML = `
			WE MAY BE MOVING FAST, BUT ONLY WITHIN A STRICTLY DEFINED SET OF CAPITALIST<br />
			PARAMETERS THAT THEMSELVES NEVER WAVER. WE EXPERIENCE ONLY THE<br />
			INCREASING SPEED OF A LOCAL HORIZON, A SIMPLE BRAIN-DEAD<br />
			ONRUSH RATHER THAN AN ACCELERATION WHICH IS ALSO<br />
			NAVIGATIONAL, AN EXPERIMENTAL PROCESS OF<br />
			DISCOVERY WITHIN A UNIVERSAL SPACE OF<br />
			POSSIBILITY. IT IS THE LATTER MODE<br />
			OF ACCELERATION WHICH WE<br />
			HOLD AS ESSENTIAL.
		`
	} else {
		message.innerHTML = 'Feels like...'
	}
}

const calculateSum = array => {
	const sum = array.reduce(
		(total, currentValue) => {
			return total + currentValue
		}, 
		0
	)
	return sum
}

const handleTap = () => {
	if (!lastTap) {
		resetCounter()
		nearestwhole.innerHTML = 'First beat'
		average.innerHTML = 'First beat'
	} else {
		// calculate the time interval between this tap and the last tap
		const newInterval = new Date() - lastTap
		intervals.push(newInterval)
		intervals.splice(0, intervals.length - 10)

		// recalculate the current average BPM
		const sumIntervals = calculateSum(intervals)
		averageBpm = (60000 / (sumIntervals / intervals.length)).toFixed(2)

		// update the UI
		average.innerHTML = `${averageBpm}<span class="unit">BPM</span>`
		nearestwhole.innerHTML = `${Math.round(averageBpm)}<span class="unit">BPM</span>`
		updateMessage()
	}

	lastTap = new Date()
}

window.addEventListener('keydown', handleTap)

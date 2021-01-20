const average = document.querySelector('.average')
const nearestwhole = document.querySelector('.nearestwhole')

const intervals = []
let lastTap = null

const resetCounter = () => {
	intervals.length = 0
}

const sumReducer = (total, currentValue) => { 
	return total + currentValue
}

const handleTap = () => {
	if (!lastTap) {
		resetCounter()
		average.textContent = 'First beat'
	} else {
		intervals.push(new Date() - lastTap)
		intervals.splice(0, intervals.length - 10)
		const sumIntervals = intervals.reduce(sumReducer, 0)
		const averageBpm = (60000 / (sumIntervals / intervals.length)).toFixed(2)
		average.textContent = averageBpm
	}

	lastTap = new Date()

	console.log(intervals)
}

window.addEventListener('keydown', handleTap)

// WE MAY BE MOVING FAST, BUT ONLY WITHIN A STRICTLY DEFINED SET OF CAPITALIST
// PARAMETERS THAT THEMSELVES NEVER WAVER. WE EXPERIENCE ONLY THE
// INCREASING SPEED OF A LOCAL HORIZON, A SIMPLE BRAIN-DEAD
// ONRUSH RATHER THAN AN ACCELERATION WHICH IS ALSO
// NAVIGATIONAL, AN EXPERIMENTAL PROCESS OF 
// DISCOVERY WITHIN A UNIVERSAL SPACE OF
// POSSIBILITY. IT IS THE LATTER MODE
// OF ACCELERATION WHICH WE 
// HOLD AS ESSENTIAL.
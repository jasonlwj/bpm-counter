import React from 'react'

const BPMDisplay = ({ bpm }) => {
	return (
		<table>
			<tbody>
				<tr>
					<td>Average BPM</td>
					<td><b>{bpm}</b></td>
				</tr>
				<tr>
					<td>Nearest Whole</td>
					<td><b>{(typeof(bpm) === 'number') ? Math.round(bpm) : ''}</b></td>
				</tr>
			</tbody>
		</table>
	)
}

export default BPMDisplay

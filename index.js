/**
 * Generates array of dates based on defined rrule pattern
 * @param {string} rrule see https://www.kanzaki.com/docs/ical/recur.html
 * 
 * All dates will be treated as UTC, other end will need to convert it using toLocaleString()
 */

const FREQS = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']
const BYDAY = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']

function interpreter (rrule) {
	if (!rrule.startsWith('RRULE')) {
		throw new AuthError('Not a valid RRULE.')
	}

	const rules = rrule.slice(6).split(';')
	const ruleObj = {}

	for (const rule of rules) {
		if (!rule) continue;

		const [type, value] = rule.split('=')
		console.log('>', type, value)

		if (type === 'FREQ') {
			if (!FREQS.includes(value)) {
				throw new AuthError(`Invalid frequency value: ${value}`)
			}

			ruleObj.frequency = value
		}

		// -- either one required

		if (type === 'UNTIL') {
			ruleObj.until = value
		}

		if (type === 'COUNT') {
			ruleObj.count = +value
		}

		// -- optionals

		if (type === 'INTERVAL') {
			ruleObj.interval = +value
		}

		if (type === 'BYDAY') {
			ruleObj.count = +value
		}

		// if (type === 'BYMONTHDAY') {
		// 	ruleObj.count = +value
		// }

		// if (type === 'BYYEARDAY') {
		// 	ruleObj.count = +value
		// }

		// if (type === 'BYWEEKNO') {
		// 	ruleObj.count = +value
		// }

		// if (type === 'BYMONTH') {
		// 	ruleObj.count = +value
		// }

		// if (type === 'BYSETPOS') {
		// 	ruleObj.count = +value
		// }

		// if (type === 'WKST') {
		// 	ruleObj.count = +value
		// }

	} // endfor

	if (!ruleObj.until && !ruleObj.count) {
		ruleObj.forever = true
	}

	return ruleObj
}


// console.log(interpreter('RRULE:FREQ=DAILY;INTERVAL=1;'))
// console.log(interpreter('Bearer:FREQ=DAILY;INTERVAL=1;'))

// --


const rr = require('rrule')

console.log(rr.rrulestr('DTSTART:20211130T045151Z\nRRULE:FREQ=DAILY;INTERVAL=1'))
// console.log(rr.rrulestr('DTSTART:20120201T023000Z\nRRULE:FREQ=MONTHLY;COUNT=5'))



// ------------------------------------------------------------

RRULE:FREQ=DAILY;INTERVAL=1;									// Everyday

// ------------------------------------------------------------

RRULE:FREQ=WEEKLY;INTERVAL=1;									// Every week
RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=SU;				// Every Sunday
RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,FR;			// Every monday and friday

RRULE:FREQ=WEEKLY;INTERVAL=2;									// Every 2 weeks 
RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=SU;				// Every other sunday

// ------------------------------------------------------------

RRULE:FREQ=MONTHLY;INTERVAL=1;								// Monthly
RRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=+1MO;			// Every first monday of the month
RRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=-1MO;			// Every last monday of the month

// ------------------------------------------------------------

RRULE:FREQ=MONTHLY;INTERVAL=2;								// Every 2 Months
RRULE:FREQ=MONTHLY;INTERVAL=2;BYDAY=+1SU;			// Every first sunday of the other month
RRULE:FREQ=MONTHLY;INTERVAL=2;BYDAY=-1SU;			// Every last sunday of the other month

// ------------------------------------------------------------

RRULE:FREQ=MONTHLY;INTERVAL=3;								// Every quarter
RRULE:FREQ=MONTHLY;INTERVAL=3;BYDAY=-1FR;			// Every last friday of the quarter

// ------------------------------------------------------------

RRULE:FREQ=MONTHLY;INTERVAL=6;								// Every 6 Months
RRULE:FREQ=MONTHLY;INTERVAL=6;BYDAY=+1TU;			// Every first tuesday of every half year

// ------------------------------------------------------------

RRULE:FREQ=YEARLY;INTERVAL=1;									// Every year

// ------------------------------------------------------------


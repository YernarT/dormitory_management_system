export default function generateI18nPluralIntervalRule(options) {
	let intervalRule = '';

	Object.entries(options).forEach(([key, value]) => {
		intervalRule += `(${key})[${value}];`;
	});

	return intervalRule;
}

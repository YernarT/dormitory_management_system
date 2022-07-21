/**
 * 时间转语义
 */

const MIN = 60e3;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365;
const MONTH = DAY * 30;

/**
 *
 * @param {string} date
 * You may pass it any valid date string.
 * @param {object} opts
 * options.max
 * Type: Integer
 * Default: null
 * If set, will limits the return to display a maximum number of non-null segments.
 * Important: When opts.zero = true then empty segments will count towards your max limit!
 *
 * options.suffix
 * Type: Boolean
 * Default: false
 * Appends "ago" or "from now" to the output.
 *
 * options.and
 * Type: Boolean
 * Default: false
 * Join the last two segments with " and ".
 *
 * options.zero
 * Type: Boolean
 * Default: false
 * Return segments with 0 value.
 *
 * options.lang
 * Type: String
 * Default: 'enUS'
 * Specify language code, supported code:
 * enUS, zhCN, ruRU, kkKZ
 *
 * @returns {string}
 * A valid date string is the only required parameter.
 */
const fromNow = (date, opts = {}) => {
	let del = new Date(date).getTime() - Date.now();
	let abs = Math.abs(del);

	if (abs < MIN) {
		switch (opts.lang || 'enUS') {
			case 'enUS':
				return 'just now';
			case 'zhCN':
				return '刚刚';
			case 'ruRU':
				return 'толка что';
			case 'kkKZ':
				return 'жаңа ғана';
			default:
				return 'just now';
		}
	}

	let periods;
	switch (opts.lang || 'enUS') {
		case 'enUS':
			periods = {
				'year': abs / YEAR,
				'month': (abs % YEAR) / MONTH,
				'day': (abs % MONTH) / DAY,
				'hour': (abs % DAY) / HOUR,
				'minute': (abs % HOUR) / MIN,
			};
			break;
		case 'zhCN':
			periods = {
				'年': abs / YEAR,
				'月': (abs % YEAR) / MONTH,
				'天': (abs % MONTH) / DAY,
				'小时': (abs % DAY) / HOUR,
				'分钟': (abs % HOUR) / MIN,
			};
			break;
		case 'ruRU':
			periods = {
				'год': abs / YEAR,
				'месяц': (abs % YEAR) / MONTH,
				'день': (abs % MONTH) / DAY,
				'час': (abs % DAY) / HOUR,
				'минут': (abs % HOUR) / MIN,
			};
			break;
		case 'kkKZ':
			periods = {
				'жыл': abs / YEAR,
				'ай': (abs % YEAR) / MONTH,
				'күн': (abs % MONTH) / DAY,
				'сағат': (abs % DAY) / HOUR,
				'минут': (abs % HOUR) / MIN,
			};
			break;
		default:
			periods = {
				'year': abs / YEAR,
				'month': (abs % YEAR) / MONTH,
				'day': (abs % MONTH) / DAY,
				'hour': (abs % DAY) / HOUR,
				'minute': (abs % HOUR) / MIN,
			};
	}

	let k,
		val,
		keep = [],
		max = opts.max || MIN; // large number

	for (k in periods) {
		if (keep.length < max) {
			val = Math.floor(periods[k]);
			if (val || opts.zero) {
				// Pluralization, example: year -> years
				switch (opts.lang || 'enUS') {
					case 'enUS':
						keep.push(`${val} ${k}${val === 1 ? '' : 's'}`);
						break;
					case 'zhCN':
						keep.push(`${val} ${k}`);
						break;
					case 'ruRU':
						// TODO
						// год года лет правила 需要查
						keep.push(`${val} ${k}`);
						break;
					case 'kkKZ':
						keep.push(`${val} ${k}`);
						break;
					default:
						keep.push(`${val} ${k}${val === 1 ? '' : 's'}`);
				}
			}
		}
	}

	k = keep.length; // reuse
	max = ', '; // reuse

	if (k > 1 && opts.and) {
		if (k === 2) max = ' ';
		switch (opts.lang || 'enUS') {
			case 'enUS':
				keep[--k] = `and ${keep[k]}`;
				break;
			case 'zhCN':
				keep[--k] = `${keep[k]}`;
				break;
			case 'ruRU':
				keep[--k] = `${keep[k]}`;
				break;
			case 'kkKZ':
				keep[--k] = `${keep[k]}`;
				break;
			default:
				keep[--k] = `and ${keep[k]}`;
		}
	}

	val = keep.join(max); // reuse

	if (opts.suffix) {
		if (del < 0) {
			switch (opts.lang || 'enUS') {
				case 'enUS':
					val = `${val} ago`;
					break;
				case 'zhCN':
					val = `${val}之前`;
					break;
				case 'ruRU':
					val = `${val} назад`;
					break;
				case 'kkKZ':
					val = `${val} бұрын`;
					break;
				default:
					val = `${val} ago`;
			}
		} else {
			switch (opts.lang || 'enUS') {
				case 'enUS':
					val = `${val} later`;
					break;
				case 'zhCN':
					val = `${val}之前`;
					break;
				case 'ruRU':
					val = `через ${val}`;
					break;
				case 'kkKZ':
					val = `${val} кейін`;
					break;
				default:
					val = `${val} later`;
			}
		}
	}

	return val;
};

export default fromNow;

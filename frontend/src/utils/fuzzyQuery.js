export default function fuzzyQuery(
	querySet,
	value = '',
	options = { inquiryMode: 'item', keyName: '' },
) {
	if (options.inquiryMode === 'item') {
		return querySet.filter(
			item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1,
		);
	}

	return querySet.filter(
		item =>
			item[options.keyName].toLowerCase().indexOf(value.toLowerCase()) !== -1,
	);
}
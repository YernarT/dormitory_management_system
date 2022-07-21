/**
 * 模糊查询 工具函数
 *
 * 提醒:
 * 当 querySet 为 ['abc', 'def', 'ghk', 'lnm']
 * 纯文本内容时 `inquiryMode` 使用 `ITEM`
 *
 * 当 querySet 为 [{ value: 'abc' }, { value: 'def' }, { value: 'ghk' }, { value: 'lnm' }]
 * 对象结构时 `inquiryMode` 使用 `KEY`, 并指定 `keyName` 为 `value`
 *
 */

export type fuzzyQueryQuerySet = string[] | { [keyName: string]: string }[];

export interface fuzzyQueryOptions {
	inquiryMode: 'ITEM' | 'KEY';
	keyName: string | number;
}

export default function fuzzyQuery(
	querySet: fuzzyQueryQuerySet,
	value: string,
	options: fuzzyQueryOptions = { inquiryMode: 'ITEM', keyName: '' },
): fuzzyQueryQuerySet {
	if (options.inquiryMode === 'ITEM') {
		return (querySet as string[]).filter(
			item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1,
		);
	}

	// `inquiryMode` === 'KEY'
	return (querySet as { [keyName: string]: string }[]).filter(item => {
		if (Object.hasOwn(item, options.keyName)) {
			return (
				item[options.keyName].toLowerCase().indexOf(value.toLowerCase()) !== -1
			);
		}
	});
}

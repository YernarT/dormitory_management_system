/**
 * 用于把 @/api, @/db 等别名转换为正确路径
 */

const fs = require('fs');

/**
 * 获取指定目录下 所有文件路径
 *
 * @param { string } entry 入口, 根目录路径
 * @param { string[]? } fileList 文件路径列表
 *
 * @return { string[] } 所有文件路径列表
 */
function walk(entry, fileList = []) {
	const files = fs.readdirSync(entry);

	files.forEach(file => {
		let fullPath = `${entry}/${file}`;
		let stats = fs.statSync(fullPath);

		if (stats.isDirectory()) {
			walk(fullPath, fileList);
		}

		if (stats.isFile()) {
			fileList.push(fullPath);
		}
	});

	return fileList;
}

// 入口, 根目录路径
const BASE_URL = 'dist';
// 所有文件路径列表
const fileList = walk(BASE_URL);

fileList.forEach(file => {
	let structure = file.split('/');
	let content = fs.readFileSync(file).toString();

	if (content.includes('require("@')) {
		fs.writeFileSync(
			file,
			content.replaceAll(
				'require("@',
				`require("${'.'.repeat(structure.length - 1)}`,
			),
		);
	}
});

/**
 * 此模块用于把 @/api, @/db 等别名转换为正确路径
 */

const fs = require('fs');

const BASE_URL = 'dist';

/**
 * 获取指定目录下 所有文件路径
 *
 * @param { string } entry 入口, 根目录路径
 * @param { string[]? } fileList 文件路径列表
 *
 * @return { string[] } 所有文件路径列表
 */
function walk(entry, fileList = []) {
	let files;
	try {
		files = fs.readdirSync(entry);
	} catch (_) {
		files = [];
	}

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

/**
 * 替换别名
 *
 * @param { string } entry 入口, 根目录路径
 *
 * @return { void }
 */
function replaceAlias(entry) {
	// 所有文件路径列表
	const fileList = walk(entry);

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
}

/**
 * 主函数
 *
 * @return { void }
 */
function main() {
	replaceAlias(BASE_URL);
}

main();

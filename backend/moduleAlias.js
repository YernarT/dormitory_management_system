/**
 * 用于把 @/api, @/db 等别名转换为正确路径
 */

const fs = require('fs');

const BASE_URL = './dist';

fs.readdirSync(BASE_URL).forEach(path => {
	let fullPath = `${BASE_URL}/${path}`;

	fs.stat(fullPath, (err, stats) => {
		if (err) {
			console.log('报错了: ', err);
			throw err;
		}

		if (stats.isFile()) {
			let content = fs.readFileSync(fullPath).toString();
			content = content.replaceAll('require("@', 'require("AAA');
			console.log(content);
		}
	});
});

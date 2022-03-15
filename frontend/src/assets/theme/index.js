import zIndex from './common/z-index';

import paletteLight from './light/palette';

import typographyLight from './light/typography';

import shapeLight from './light/shape';

import chartLight from './light/chart';

/**
 * 初代设计 没有 Light/Dark 模式, 只有 Light模式 设计
 *
 * @return {object} theme 主题对象
 */
export default function getTheme() {
	return {
		palette: paletteLight,
		typography: typographyLight,
		shape: shapeLight,
		chart: chartLight,
		zIndex,
	};
}

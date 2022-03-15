import React, { memo } from 'react';
import { CssBaseLineBox } from './style';

/**
 * 配置 CSS 基本样式
 * 基于 theme 对象
 * @returns {FC} 普通组件
 */
export default memo(function CssBaseLine() {
	return <CssBaseLineBox />;
});

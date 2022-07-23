import type {
	FlattenInterpolation,
	ThemeProps,
	DefaultTheme,
} from 'styled-components';

import 'styled-components';
import { css } from 'styled-components';

export type themeMode = 'LIGHT' | 'DARK';

declare module 'styled-components' {
	export interface DefaultTheme {
		palette: {
			mode: themeMode;
			primary: string;
			secondary: string;
			error: string;
			warning: string;
			success: string;
			disabled: string;

			componentBackground: string;
			backgroundColor: string;
		};

		shape: {
			borderRadius: string;
			borderColor: string;

			generalApperance: {
				padding: string;

				border: string;
				borderRadius: string;
				backgroundColor: string;

				apply: apply;
			};

			iconAppearance: {
				color: string;
				fontSize: string;

				apply: apply;
			};
		};
	}
}

type apply = () => FlattenInterpolation<ThemeProps<DefaultTheme>>;

const theme: DefaultTheme = {
	palette: {
		mode: 'LIGHT',
		primary: '#00a884',
		secondary: 'rgba(150, 150, 150, 0.8)',
		error: '#f5222d',
		warning: '#faad14',
		success: '#52c41a',
		disabled: 'rgba(0, 0, 0, 0.25)',

		componentBackground: '#fff',
		backgroundColor: '#f0f2f5',
	},

	shape: {
		borderRadius: '4px',
		borderColor: '#e5e5e5',

		// 通用的(常用的) 外观样式
		generalApperance: {
			padding: '24px',

			border: '1px solid #e5e5e5',
			borderRadius: '6px',
			backgroundColor: '#fff',

			apply: () => css`
				padding: 24px;

				border: 1px solid #e5e5e5;
				border-radius: 6px;
				background-color: #fff;
			`,
		},

		// 图标 外观样式
		iconAppearance: {
			color: '#00a884',
			fontSize: '1.25rem',

			apply: () => css`
				color: #00a884;
				font-size: 1.25rem;
			`,
		},
	},
};

export default theme;

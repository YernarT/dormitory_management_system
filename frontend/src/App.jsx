import React from 'react';
// import { BrowserRouter } from 'react-router-dom';

// import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// import { RouteGuard } from '@/components';
// import { CssBaseLine, ToastContainer } from '@/compact-ui';

// import { useEventListener, useCreation } from 'ahooks';
// import { localStorage } from '@/utils';

// import { useRecoilValue } from 'recoil';
// import { userAtom, pageAtom } from '@/store';

// import getTheme from '@/assets/theme';
// import routes from '@/routes';

export default function App() {
	// const user = useRecoilValue(userAtom);
	// const page = useRecoilValue(pageAtom);

	// // Refresh the page to save the data in Recoil to LocalStorage
	// useEventListener('beforeunload', () => {
	// 	localStorage.set('user', user);
	// 	localStorage.set('page', page);
	// });

	// Theme object
	// const theme = useCreation(() => getTheme(page.viewMode), [page.viewMode]);

	return (
        <div className="App">App</div>
	);
}

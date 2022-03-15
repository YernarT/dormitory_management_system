import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeState } from 'ahooks';

import { IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { SearchbarStyledBox } from './style';

export default memo(function Searchbar() {
	const { t } = useTranslation();
	const [searchedText, setSearchedText] = useSafeState('');

	const handleKeyDown = ({ code }) => {
		if (code === 'Enter') {
			handleSearch();
		}
	};

	const handleSearch = () => {
		let _searchedText = searchedText.trim();
		console.log(`你搜索了: ${_searchedText}`);
	};

	return (
		<SearchbarStyledBox>
			<input
				type="search"
				value={searchedText}
				onChange={({ target: { value } }) => setSearchedText(value)}
				onKeyDown={handleKeyDown}
				placeholder={t('header_search')}
			/>
			<IconButton
				aria-label="search"
				className="search-btn"
				onClick={handleSearch}>
				<SearchOutlined />
			</IconButton>
		</SearchbarStyledBox>
	);
});

export const localStorage = {
	get(key, defaultValue) {
		return JSON.parse(
			window.localStorage.getItem(key) || JSON.stringify(defaultValue),
		);
	},

	set(key, value) {
		window.localStorage.setItem(key, JSON.stringify(value));
	},
};

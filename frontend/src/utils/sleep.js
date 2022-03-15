/**
 * JS version sleep function, refer to Python's time.sleep()
 */

export default async function sleep(ms = 1000) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

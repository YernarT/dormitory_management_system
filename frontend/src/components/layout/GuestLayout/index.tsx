// common component
import { RouteGuard } from '@/components/common';
// Inner component
import Header from './Header';

// Scoped style
import classes from './style.module.scss';

// routes
import routes from '@/routes';

export default function GuestLayout() {
	return (
		<div className={classes.guestLayout}>
			<Header />
			<div className="content-block">
				<RouteGuard routes={routes} />
			</div>
		</div>
	);
}

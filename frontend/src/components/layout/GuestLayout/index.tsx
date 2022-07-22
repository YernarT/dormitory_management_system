// 组件
import Header from './Header';
import { Footer } from '@/components/common';
// 样式组件
import { GuestLayoutStyled } from './style';

interface GuestLayoutProps {
	children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
	return (
		<GuestLayoutStyled>
			<Header />
			<main className="content">{children}</main>
			<Footer />
		</GuestLayoutStyled>
	);
}

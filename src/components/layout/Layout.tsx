import { FC, useState } from 'react'
import { LayoutProps } from '@/components/layout/Layout.props'
import styles from './Layout.module.scss'
import Backdrop from '@/components/ui/Backdrop/Backdrop'
import Drawer from '@/components/layout/Drawer/Drawer'
import MenuToggle from '@/components/layout/MenuToggle/MenuToggle'

const Layout: FC<LayoutProps> = (props): JSX.Element => {
	const { children } = props
	const [open, setOpen] = useState(false)

	const toggleSidebar = (): void => {
		setOpen(!open)
	}

	return (
		<div className={styles.layout}>
			<MenuToggle isOpen={open} onClick={toggleSidebar}/>
			<Drawer isOpen={open} onClick={toggleSidebar}/>
			<Backdrop isOpen={open} onClick={toggleSidebar}/>
			<main className={styles.main}>
				{children}
			</main>
		</div>
	)
}

export const withLayout = <T extends Record<string, unknown>>(Component: FC<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		)
	}
}
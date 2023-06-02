import { FC } from 'react'
import styles from './EducationProgramList.module.scss'
import { EducationProgramListProps } from '@/components/screens/EducationProgramList/EducationProgramList.props'
import EducationProgramItem from '@/components/screens/EducationProgramList/EducationProgramItem/EducationProgramItem'

const links: { id: string, to: string, label: string }[] = [
	{ id: '1', to: 'bakalavriat/educational-subcategory', label: 'Бакалавриат' },
	{ id: '2', to: 'magistratura/educational-subcategory', label: 'Магистратура' },
	{ id: '3', to: 'doktorantura/educational-subcategory', label: 'Докторантура' },
]

const EducationProgramList: FC<EducationProgramListProps> = () => {
	return (
		<div className={styles.EducationProgramList}>
			<div className={styles.container}>
				<div className='p-4 w-full bg-white rounded-lg border shadow-md sm:p-6'>
					<h5 className='mb-3 text-3xl text-center font-bold text-gray-900 md:text-4xl'>
						Образовательные программы
					</h5>
					<ul className={styles.list}>
						{
							links.map(link => (
								<EducationProgramItem key={link.id} {...link} />
							))
						}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default EducationProgramList

import { FC, useCallback, useMemo } from 'react'
import styles from './Table.module.scss'
import { TableProps } from '@/components/screens/Dashboard/Table/Table.props'
import MaterialReactTable from 'material-react-table'
import { AiFillDelete } from 'react-icons/ai'
import Htag from '@/components/Htag/Htag'
import cn from 'classnames'
import axios from 'axios'
import { CONTACT_FORM_BASE_URL } from '@/configs/constants'
import { Button } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { utils, writeFileXLSX } from 'xlsx'


const Table: FC<TableProps> = (props) => {
	const { users = [], removeDuplicate } = props

	const columns = useMemo(
		() => [
			{
				accessorKey: 'firstName',
				header: 'Имя',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'lastName',
				header: 'Фамилия',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'patronymic',
				header: 'Отчество',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'email',
				header: 'Email',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'phone',
				header: 'Телефон',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'birthday',
				header: 'Дата рождения',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'created_at',
				header: 'Дата регистрации',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'socialStatus',
				header: 'Социальный статус',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'regions',
				header: 'Регион',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'cities',
				header: 'Город',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'institutionType',
				header: 'Вид учебного заведения',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'institutions',
				header: 'Учебное заведение',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'yourInstitution',
				header: 'Учебное заведение отстутствующее в общем списке',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'formStudy',
				header: 'Форма обучения',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'educationProgram',
				header: 'Образовательная программа',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'achievements',
				header: 'Награды и достижения',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'formPayment',
				header: 'Оплата',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'languages',
				header: 'Язык обучения',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'consultantDepartment',
				header: 'Кафедра-консультант',
				// enableClickToCopy: true
			},
			{
				accessorKey: 'yourQuestion',
				header: 'Вопрос',
				// enableClickToCopy: true
			}

		],
		[]
	)

	const handleExportData = useCallback(() => {
		const students = users.map((user: any) => {
			return {
				'Имя': user.firstName,
				'Фамилия': user.lastName,
				'Отчество': user.patronymic,
				'Email': user.email,
				'Телефон': user.phone,
				'Дата рождения': user.birthday,
				'Дата регистрации': user.created_at,
				'Социальный статус': user.socialStatus,
				'Регион': user.regions,
				'Город': user.cities,
				'Вид учебного заведения': user.institutionType,
				'Учебное заведение': user.institutions,
				'Учебное заведение отстутствующее в общем списке' : user.yourInstitution,
				'Форма обучения': user.formStudy,
				'Предполагаемая образовательная программа': user.educationProgram,
				'Награды и достижение': user.achievements,
				'Предполагаемая форма оплаты за обучение в ВУЗе': user.formPayment,
				'Язык обучения': user.languages,
				'Кафедра-консультант - от кого получена информация о ВУЗе)': user.consultantDepartment,
				'Вопрос': user.yourQuestion
			}
		})
		const ws = utils.json_to_sheet(students)
		const wb = utils.book_new()
		utils.book_append_sheet(wb, ws, 'Data')
		writeFileXLSX(wb, 'SheetJSReactAoO.xlsx')
	}, [users])

	return (
		<div className={styles.dashboard}>
			<div className={styles.row}>
				<Htag className={styles.title} tag={'h1'}>Абитуриенты</Htag>
			</div>
			<div className={styles.scroll} style={{
				maxWidth: '90vw'
			}}>
				<MaterialReactTable enableClickToCopy  columns={columns} data={users} muiTableHeadCellProps={{
					sx: {
						fontFamily: 'Montserrat Alternates',
						fontWeight: 'bold',
						fontSize: '16px',
						backgroundColor: '#164e63',
						color: '#fff',
						textAlign: 'center'
					}
				}} muiTableBodyCellProps={{
					sx: {
						fontFamily: 'Montserrat Alternates',
						fontSize: '16px'
					}
				}} enableColumnResizing={true} enableRowSelection={true}
														renderTopToolbarCustomActions={({ table }) => {
															const handleDeactivate = () => {
																table.getSelectedRowModel().flatRows.map((row) => {
																	if (confirm('Удалить пользователя?')) {
																		axios.delete(
																			`${CONTACT_FORM_BASE_URL}/contacts/${row.original.id}.json`
																		).then(r => console.log(r))
																	}
																})
															}
															return (
																<div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
																	<AiFillDelete
																		className={cn(
																			styles.remove,
																			table.getSelectedRowModel().flatRows.length === 0 &&
																			styles.disabled
																		)}
																		onClick={handleDeactivate}
																	/>
																	<Button
																		color='primary'
																		onClick={handleExportData}
																		startIcon={<FileDownloadIcon />}
																		variant='contained'
																		style={{ fontFamily: 'Montserrat Alternates' }}
																	>
																		Экспортировать в Excel
																	</Button>
																	<Button
																		color='primary'
																		onClick={removeDuplicate}
																		startIcon={<DeleteForeverIcon />}
																		variant='contained'
																		style={{ fontFamily: 'Montserrat Alternates' }}
																	>
																		Удалить дубликаты
																	</Button>
																</div>
															)
														}}
				/>
			</div>
		</div>
	)
}

export default Table

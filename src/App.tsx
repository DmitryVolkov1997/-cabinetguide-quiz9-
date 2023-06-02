import Home from '@/components/screens/Home/Home'
import { withLayout } from '@/components/layout/Layout'
import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import QuizCreator from '@/components/screens/QuizCreator/QuizCreator'
import QuizList from '@/components/screens/QuizList/QuizList'
import Quiz from '@/components/screens/Quiz/Quiz'
import EducationProgramList from '@/components/screens/EducationProgramList/EducationProgramList'
import EducationSubcategoryList from '@/components/screens/EducationSubcategoryList/EducationSubcategoryList'
import Dashboard from '@/components/screens/Dashboard/Dashboard'
import SuccessfulForm from '@/components/screens/SuccessfulForm/SuccessfulForm'
import UnsuccessfulForm from '@/components/screens/UnsuccessfulForm/UnsuccessfulForm'

const App: FC = (): JSX.Element => {
	return (
		<>
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/quiz-creator'} element={<QuizCreator />} />
				{/*<Route path={'/educational-programs/educational-subcategory/:category/:subcategory'} element={<QuizList />} />*/}
				<Route path={'/educational-programs/:id/educational-subcategory/:category/:subcategory'}
							 element={<QuizList />} />

				<Route path={'/educational-programs'} element={<EducationProgramList />} />
				{/*<Route path={'educational-programs/educational-subcategory'} element={<EducationSubcategoryList/>} />*/}
				<Route path={'educational-programs/:id/educational-subcategory'} element={<EducationSubcategoryList />} />
				<Route path={'/educational-programs/:name/educational-subcategory/:category/:subcategory/:id'}
							 element={<Quiz />} />

				<Route path={'/dashboard'} element={<Dashboard />}/>
				<Route path={'/successful-form'} element={<SuccessfulForm />}/>
				<Route path={'/unsuccessful-form'} element={<UnsuccessfulForm />}/>
			</Routes>
		</>
	)
}
export default withLayout(App)

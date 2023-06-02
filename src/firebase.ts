import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
	apiKey: 'AIzaSyBa8TJmeQxixeSzerM4cRB1ZCvPLexzicE',
	authDomain: 'react-quize-1ad48.firebaseapp.com',
	databaseURL: 'https://react-quize-1ad48-default-rtdb.firebaseio.com',
	projectId: 'react-quize-1ad48',
	storageBucket: 'react-quize-1ad48.appspot.com',
	messagingSenderId: '810464536234',
	appId: '1:810464536234:web:f58ed0da92ef971ce012d3'
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage()
import {combineReducers} from 'redux'
import app from './app/reducer'
import article from './article/reducer'
import user from './user/reducer'
import common from './common/reducer'

export default combineReducers({
	app,
	article,
	user,
	common
})

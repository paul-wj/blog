import {combineReducers} from 'redux'
import admin from './admin/reducer'
import article from './article/reducer'
import user from './user/reducer'
import common from './common/reducer'

export default combineReducers({
	admin,
	article,
	user,
	common
})

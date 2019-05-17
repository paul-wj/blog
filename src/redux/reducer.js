import {combineReducers} from 'redux'
import article from './article/reducer'
import user from './user/reducer'
import common from './common/reducer'

export default combineReducers({
	article,
	user,
	common
})

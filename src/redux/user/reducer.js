import {changeState} from "../../lib/plugins/redux-plugins";
const defaultState = {
	userInfo: {
		userId: null,
		name: null,
		token: null,
		avatarColor: null
	}
};
export const userReducer = (state = {...defaultState}, {type, payload}) => {
	console.log('userReducer:', {type, payload})
	return changeState(state, [type, payload])
};
export default userReducer;


import {changeState} from "../../lib/plugins/redux-plugins";
const defaultState = {
	userInfo: {
		userId: null,
		name: null,
		token: null,
		avatarColor: '#52c41a'
	}
};
const userReducer = (state = defaultState, {type, payload}) => {
	return changeState(state, [type, payload])
};
export default userReducer;


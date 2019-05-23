import {changeState} from "../../lib/plugins/redux-plugins";
const defaultState = {
	userInfo: {
		userId: null,
		email: null,
		username: null,
		nick: null,
		token: null,
		avatarColor: null
	}
};
export const userReducer = (state = {...defaultState}, {type, payload}) => changeState(state, [type, payload]);
export default userReducer;


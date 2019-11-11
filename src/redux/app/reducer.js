import {changeState} from "../../lib/plugins/redux-plugins";
const defaultState = {
	collapsed: false,
	openKeys: [],
	selectedKeys: [],
	unreadMessageList: [],
	appLayoutWidth: 0
};
export const appReducer = (state = defaultState, {type, payload}) => changeState(state, [type, payload]);
export default appReducer;


import {changeState} from "../../lib/plugins/redux-plugins";
const defaultState = {
	authModalVisible: false,
	authModalType: null
};

export const commonReducer = (state = defaultState, {type, payload}) => changeState(state, [type, payload]);
export default commonReducer;


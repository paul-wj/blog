import {changeState} from "../../lib/plugins/redux-plugins";
const defaultState = {
	categoryList: [],
	tagList: []
};
export const articleReducer = (state = defaultState, {type, payload}) => changeState(state, [type, payload]);
export default articleReducer;


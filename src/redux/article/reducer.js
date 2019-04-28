import {changeState} from "../../lib/plugins/redux-plugins";
const defaultState = {
	categoryList: [],
	tagList: []
};
const articleReducer = (state = defaultState, {type, payload}) => changeState(state, [type, payload]);
export default articleReducer;


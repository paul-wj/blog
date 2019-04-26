import {changeState} from "../../lib/utils";
const defaultState = {
	categoryList: [],
	tagList: []
};
const articleReducer = (state = defaultState, {type, payload}) => changeState(state, [type, payload]);
export default articleReducer;


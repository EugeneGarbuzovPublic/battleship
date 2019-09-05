import { combineReducers } from 'redux';
import stage from './stage/reducer';
import arrangement from './arrangement/reducer';

/*todo rearrange reducers*/
export default combineReducers({
    stage,
    arrangement
});
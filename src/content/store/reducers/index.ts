import { combineReducers } from 'redux';
import ASReducer from './as.reducer';
import AppDataReducer from './appData.reducer';
import PTRReducer from './ptr.reducer';

export default combineReducers({
	aerialSphereData: ASReducer,
	appData: AppDataReducer,
	ptrData: PTRReducer,
});


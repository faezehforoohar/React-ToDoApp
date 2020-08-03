import { combineReducers } from 'redux';
import { tasks } from './task.reducer';
import { alert } from './alert.reducer';



const rootReducer = combineReducers({
  tasks,
  alert
});

export default rootReducer;
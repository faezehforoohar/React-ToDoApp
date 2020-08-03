import { taskConstants } from '../_constants';

const initialState = {
  loading: false,
  items: [],
  current_task: {
    title: "",
    description: "",
    categoryTypeId: 0,
    id: "0",
  },
  error: null,
  showModal: false
}
export function tasks(state = initialState, action) {
  switch (action.type) {
    case taskConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case taskConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.tasks
      };
    case taskConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case taskConstants.DELETE_REQUEST:
      return {
        ...state,
        loading:true,
      };
    case taskConstants.DELETE_SUCCESS:
      return {
        ...state,
       loading:false,
      };
    case taskConstants.DELETE_FAILURE:
      return {
        ...state,
        loading:false,
      };
    case taskConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case taskConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading:false,
        current_task: action.task
      };
    case taskConstants.GETBYID_FAILURE:
      return {
        ...state,
      };
      //save
      case taskConstants.SAVE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case taskConstants.SAVE_SUCCESS:
      return {
        ...state,
        loading:false,
        current_task: initialState
      };
    case taskConstants.SAVE_FAILURE:
      return {
        ...state,
      };
    case taskConstants.SHOW_MODAL:
      return {
        ...state,
        showModal: action.showModal
      };
    default:
      return state
  }
}
import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message,
        messageModal:'',
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message,
        messageModal:'',
      };
      //
      case alertConstants.ERROR_MODAL:
        return {
          type: 'alert-danger',
          messageModal: action.message,
          message:''
        };
    case alertConstants.CLEAR:
      return {
        message: '',
        messageModal:''
      };
    default:
      return state
  }
}
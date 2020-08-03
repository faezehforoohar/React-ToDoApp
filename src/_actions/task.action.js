import { taskConstants } from '../_constants';
import { taskService } from '../_services';
import { alertActions } from './';

export const taskActions = {
    getAll,
    getById,
    delete: _delete,
    showModal,
    save
};

function getAll() {
    return dispatch => {

        dispatch(request());

        taskService.getAll()
            .then(
                tasks => dispatch(success(tasks.lst)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: taskConstants.GETALL_REQUEST } }
    function success(tasks) { return { type: taskConstants.GETALL_SUCCESS, tasks } }
    function failure(error) { return { type: taskConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {

        dispatch(request());

        taskService.getById(id)
            .then(
                task => dispatch(success(task.task)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: taskConstants.GETBYID_REQUEST, id } }
    function success(task) { return { type: taskConstants.GETBYID_SUCCESS, task } }
    function failure(error) { return { type: taskConstants.GETBYID_FAILURE, id, error } }
}
function save(task) {
    return dispatch => {
        dispatch(request(task));
        taskService.save(task)
            .then(
                task => {
                    dispatch(success());
                    dispatch(alertActions.success(`ثبت اطلاعات با موفقیت انجام شد.`));

                    dispatch(showModal(false));
                    dispatch(getAll());

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(task) { return { type: taskConstants.SAVE_REQUEST, task } }
    function success(task) { return { type: taskConstants.SAVE_SUCCESS, task } }
    function failure(error) { return { type: taskConstants.SAVE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        taskService.delete(id)
            .then(
                task => {
                    dispatch(success(id));
                    dispatch(alertActions.success(`حذف اطلاعات با موفقیت انجام شد.`));
                    dispatch(getAll());
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: taskConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: taskConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: taskConstants.DELETE_FAILURE, id, error } }
}
function showModal(status) {

    return dispatch => {

        dispatch(success());
    };
    function success() { return { type: taskConstants.SHOW_MODAL, showModal: status } }
}
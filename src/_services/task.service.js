import { authHeader } from '../_helpers';
const apiUrl = "https://localhost:44362/api";
export const taskService = {
    getAll,
    getById,
    save,
    delete: _delete
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };


    return fetch(`${apiUrl}/Tasks`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/Tasks/${id}`, requestOptions).then(handleResponse);
}

function save(task) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    };

    return fetch(`${apiUrl}/Tasks`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/Tasks/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else {

            if (data.result)
                return data;
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    });
}
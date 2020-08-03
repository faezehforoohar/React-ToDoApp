import React, { Fragment, useRef, useEffect } from 'react';
import { Form, Modal, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions, alertActions } from '../../_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function TaskSave(props) {
    const title = useRef('');
    const desc = useRef('');
    const categoryTypeId = useRef('');
    const type = props.type;
    const tasks = useSelector(state => state.tasks);
    const alert = useSelector(state => state.alert);
    const loading = useSelector(state => state.tasks.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(alertActions.clear());

    }, []);
    function SaveTask() {
        var task = {};

        if (title.current.value == '') {
            dispatch(alertActions.error('Enter Title Field!'));
            return;
        }
        task.id = tasks.current_task.id;
        task.description = desc.current.value;
        task.title = title.current.value;
        task.categoryTypeId = parseInt(categoryTypeId.current.value);
        dispatch(taskActions.save(task));
    }
    function closeModal() {
        dispatch(taskActions.showModal(false));
    }
    return (
        <Fragment>
            <Modal show={tasks.showModal} onHide={closeModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section >
                        {(!loading ? <div className="container">
                            {alert.message &&
                                <div className={`alert ${alert.type} col-lg-12`}>{alert.message}</div>
                            }
                            <Form key={tasks.current_task.id}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" ref={title} defaultValue={tasks.current_task.title || ''} />
                                    </Form.Group>

                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="categoryTypeId">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control as="select" defaultValue={tasks.current_task.categoryTypeId} ref={categoryTypeId}>
                                            <option value={1}>To Do</option>
                                            <option value={2}>Doing</option>
                                            <option value={3}>Done</option>
                                        </Form.Control>
                                    </Form.Group>

                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control rows="3" ref={desc} as="textarea" defaultValue={tasks.current_task.description || ''} />
                                    </Form.Group>
                                </Form.Row>
                                <br />


                            </Form>
                        </div>
                            : <div className="text-center"><CircularProgress disableShrink variant="indeterminate"/></div>)}
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
          </Button>
                    <Button variant="primary" className="btn btn-success" onClick={SaveTask}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </Fragment >
    );
}
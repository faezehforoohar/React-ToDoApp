import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../_actions';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/SearchRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton';
import TaskSave from './TaskSave';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        minHeight: 240,
    },
}));

export default function TaskList() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const tasks = useSelector(state => state.tasks);
    const [items, setItems] = useState([]);
    const [type, setType] = useState();
    const [itemsToDo, setItemsToDo] = useState([]);
    const [itemsDoing, setItemsDoing] = useState([]);
    const [itemsDone, setItemsDone] = useState([]);
    const loading = useSelector(state => state.tasks.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(taskActions.getAll());
    }, []);
    useEffect(() => {
        if (!loading) {
            setItems([...tasks.items]);
            setItemsToDo([...tasks.items.filter(m => m.categoryTypeId == 1)]);
            setItemsDoing([...tasks.items.filter(m => m.categoryTypeId == 2)]);
            setItemsDone([...tasks.items.filter(m => m.categoryTypeId == 3)]);
        }
    }, [loading]);
    function searchTask(event, type) {
        let filter = event.target.value;
        let arr = items.filter(m => m.categoryTypeId == type);

        let found = !filter ? arr : arr.filter(m => m.title.includes(filter));

        if (type == 1)
            setItemsToDo([...found]);
        else if (type == 2)
            setItemsDoing([...found]);
        else
            setItemsDone([...found]);
    }
    function showSave(type) {

        setType(type);
        dispatch(taskActions.showModal(true));
    }
    function saveTask(id) {

        dispatch(taskActions.getById(id));
        dispatch(taskActions.showModal(true));
    }
    function deleteTask(id) {
        var r = window.confirm("Are you sure for deleting this item?");
        if (r == true) {
            dispatch(taskActions.delete(id));
        }
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper} title="To Do">
                    <h4 className="title">To Do</h4>
                    <TextField
                        id="outlined-full-width"
                        placeholder="Search"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onKeyUp={(e) => searchTask(e, 1)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment >
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {(!loading ? itemsToDo.map(item => {
                        return (
                            <div key={item.id} className={`task task1 container`}>
                                <div className="row">
                                    <div className="col" style={{ padding: '5px' }}> {item.title}</div>
                                    <div className="col text-right">
                                        <IconButton aria-label="edit" onClick={() => saveTask(item.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => deleteTask(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </div>
                                </div>
                            </div>
                        );
                    }) : <div><Skeleton />
                            <Skeleton animation={false} />
                            <Skeleton animation="wave" /></div>)}

                    <button onClick={() => showSave(1)} className="btn btn-success">Add ToDo Task</button>
                </Paper>
            </Grid >
            <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper} title="Doing">
                    <h4 className="title">Doing</h4>
                    <TextField
                        id="outlined-full-width"
                        placeholder="Search"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onKeyUp={(e) => searchTask(e, 2)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment >
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {(!loading ? itemsDoing.map(item => {
                        return (
                            <div key={item.id} className={`task task2 container`}>
                                <div className="row">
                                    <div className="col" style={{ padding: '5px' }}> {item.title}</div>
                                    <div className="col text-right">
                                        <IconButton aria-label="edit" onClick={() => saveTask(item.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => deleteTask(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </div>
                                </div>
                            </div>
                        );
                    }) : <div><Skeleton />
                            <Skeleton animation={false} />
                            <Skeleton animation="wave" /></div>)}
                    <button onClick={() => showSave(2)} className="btn btn-success">Add Doing Task</button>
                </Paper>
            </Grid >
            <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper} title="Done">
                    <h4 className="title">Done</h4>
                    <TextField
                        id="outlined-full-width"
                        placeholder="Search"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onKeyUp={(e) => searchTask(e, 3)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment >
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {(!loading ? itemsDone.map(item => {
                        return (
                            <div key={item.id} className={`task task3 container`}>
                                <div className="row">
                                    <div className="col" style={{ padding: '5px' }}> {item.title}</div>
                                    <div className="col text-right">
                                        <IconButton aria-label="edit" onClick={() => saveTask(item.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => deleteTask(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </div>
                                </div>
                            </div>
                        );
                    }) : <div><Skeleton />
                            <Skeleton animation={false} />
                            <Skeleton animation="wave" /></div>)}
                    <button onClick={() => showSave(1)} className="btn btn-success">Add Done Task</button>
                </Paper>
            </Grid >
            {tasks.showModal ? <TaskSave type={type} /> : ""}
        </Grid >
    );
}
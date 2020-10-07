import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Tabs, Popconfirm, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Todos from './Todos/Todos';
import Users from './Users/Users';
import AddEditModal from './AddEditModal';
import { Modal_Types } from '../utility/constants';
import * as todosActions from '../store/actions/todosActions';
import * as usersActions from '../store/actions/usersActions';
import './home.css';

const { TabPane } = Tabs;

const Home = () => {
    const dispatch = useDispatch();

    const todosList = useSelector(state => state.todos)
    const usersList = useSelector(state => state.users)

    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editRecord, setEditRecord] = useState({});


    useEffect(() => {
        const todosList = JSON.parse(localStorage.getItem('todos'));
        const usersList = JSON.parse(localStorage.getItem('users'));
        dispatch(todosActions.getTodos(todosList));
        dispatch(usersActions.getUsers(usersList));
    }, [])

    useEffect(() => {
        setTodos(todosList);
        setUsers(usersList);
    }, [todosList, usersList])

    const hideModal = () => {
        setVisible(false);
        if (editMode) {
            setEditRecord({});
            setEditMode(false);
        }
    }
    const showModal = () => setVisible(true);

    const createHandler = (values) => {
        setLoading(true);
        setTimeout(() => {
            if (modalType === Modal_Types.TODO) {
                const formValue = {
                    ...values,
                    dateadded: moment(values["dateadded"]).format("YYYY-MM-DD HH:mm:ss")
                };
                dispatch(todosActions.addTodo(formValue));
            } else {
                dispatch(usersActions.addUser(values));
            }
            setVisible(false);
            setLoading(false)
        }, 2000);
    }

    const editDataHandler = (oldData, formData) => {
        const newData = [...oldData];
        const index = newData.findIndex((item) => editRecord.key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...formData });
        }
        return newData
    }

    const editHandler = async (values) => {
        setLoading(true);
        setTimeout(() => {
            if (modalType === Modal_Types.TODO) {
                const formValue = {
                    ...values,
                    dateadded: moment(values["dateadded"]).format("YYYY-MM-DD HH:mm:ss")
                };
                const newData = editDataHandler(todos.todos, formValue);
                console.log(newData)
                dispatch(todosActions.editTodo(newData));
            } else {
                const newData = editDataHandler(users.users, values);
                console.log(newData)
                dispatch(usersActions.editUser(newData));
            }
            setVisible(false);
            setEditRecord({});
            setEditMode(false);
            setLoading(false)
        }, 2000)
    }

    const editModeHandler = (record) => {
        setVisible(true);
        setEditMode(true);
        setEditRecord(record);
    }

    const todoEditHandler = (record) => {
        setModalType(Modal_Types.TODO);
        editModeHandler(record);
    }

    const userEditHandler = (record) => {
        setModalType(Modal_Types.USER);
        editModeHandler(record);
    }

    const addTypeHandler = addType => setModalType(addType);

    const addTodoHandler = () => {
        showModal();
        addTypeHandler(Modal_Types.TODO);
    }

    const addUserHandler = () => {
        showModal();
        addTypeHandler(Modal_Types.USER);
    }

    const deleteTodo = key => dispatch(todosActions.deleteTodo(key))
    const deleteUser = key => dispatch(usersActions.deleteUser(key))

    const todoColumns = [
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            editable: true,
            width: '33%'
        },
        {
            title: 'DateAdded',
            dataIndex: 'dateadded',
            key: 'dateadded',
            editable: true,
            width: '33%'
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            width: '34%',
            render: (_, record) => {
                return (
                    <div>
                        <a
                            onClick={() => todoEditHandler(record)}
                            href="#!"
                        >
                            Edit
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => deleteTodo(record.key)}
                        >
                            <a href="#!">Delete</a>
                        </Popconfirm>
                    </div>
                )
            },
        }
    ]

    const userColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            width: '33%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            editable: true,
            width: '33%'
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            width: '34%',
            render: (_, record) => {
                return (
                    <div>
                        <a
                            onClick={() => userEditHandler(record)}
                            href="#!"
                        >
                            Edit
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => deleteUser(record.key)}
                        >
                            <a href="#!">Delete</a>
                        </Popconfirm>
                    </div>
                )
            },
        }
    ]

    return (
        <React.Fragment>
            <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="Todos" key="1">
                    <Todos
                        onAddTodo={addTodoHandler}
                        dataSource={todos.todos}
                        mergedColumns={todoColumns}
                    />
                </TabPane>
                <TabPane tab="Users" key="2">
                    <Users
                        onAddUser={addUserHandler}
                        dataSource={users.users}
                        mergedColumns={userColumns}
                    />
                </TabPane>
            </Tabs>
            <AddEditModal
                visibility={visible}
                loading={loading}
                onCreate={createHandler}
                onEdit={editHandler}
                onCancel={hideModal}
                type={modalType}
                mode={editMode}
                record={editRecord}
            />
        </React.Fragment>
    )
}

export default Home

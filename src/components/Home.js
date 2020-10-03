import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Tabs, Form, Popconfirm, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Todos from './Todos/Todos';
import Users from './Users/Users';
import AddModal from '../utility/AddModal';
import { Modal_Types } from '../utility/constants';
import * as todosActions from '../store/actions/todosActions';
import * as usersActions from '../store/actions/usersActions';
import './home.css';

const { TabPane } = Tabs;

const Home = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const todosList = useSelector(state => state.todos)
    const usersList = useSelector(state => state.users)

    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editTodoKey, setEditTodoKey] = useState('');
    const [editUserKey, setEditUserKey] = useState('');


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

    const hideModal = () => setVisible(false);
    const showModal = () => setVisible(true);

    const createHandler = (values, type) => {
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

    const addTypeHandler = addType => setModalType(addType);

    const todoHandler = () => {
        showModal();
        addTypeHandler(Modal_Types.TODO);
    }

    const userHandler = () => {
        showModal();
        addTypeHandler(Modal_Types.USER);
    }

    const isTodoEditing = record => record.key === editTodoKey
    const isUserEditing = record => record.key === editUserKey

    const editTodo = (record) => {
        form.setFieldsValue({
            action: '',
            dateadded: '',
            ...record,
        });
        setEditTodoKey(record.key);
    };

    const editUser = (record) => {
        form.setFieldsValue({
            name: '',
            email: '',
            ...record,
        });
        setEditUserKey(record.key);
    };

    const deleteTodo = key => dispatch(todosActions.deleteTodo(key))
    const deleteUser = key => dispatch(usersActions.deleteUser(key))


    const saveTodo = async (key) => {
        const row = await form.validateFields();
        const newData = [...todos.todos];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
        } else {
            newData.push(row);
        }
        setEditTodoKey('')
        dispatch(todosActions.editTodo(newData))
    }

    const saveUser = async (key) => {
        const row = await form.validateFields();
        const newData = [...users.users];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
        } else {
            newData.push(row);
        }
        setEditUserKey('')
        dispatch(usersActions.editUser(newData))
    }

    const cancelTodo = () => setEditTodoKey('')
    const cancelUser = () => setEditUserKey('')

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
                const editable = isTodoEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="#!"
                            onClick={() => saveTodo(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={() => cancelTodo(record.key)}
                        >
                            <a href="#!">Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <div>
                            <a
                                disabled={editTodoKey !== ""}
                                onClick={() => editTodo(record)}
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
                const editable = isUserEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="#!"
                            onClick={() => saveUser(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={() => cancelUser(record.key)}
                        >
                            <a href="#!">Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <div>
                            <a
                                disabled={editTodoKey !== ""}
                                onClick={() => editUser(record)}
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

    const mergedTodoColumns = todoColumns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'key' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isTodoEditing(record),
            }),
        };
    });

    const mergedUserColumns = userColumns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'key' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isUserEditing(record),
            }),
        };
    });

    return (
        <React.Fragment>
            <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="Todos" key="1">
                    <Todos
                        todoHandler={todoHandler}
                        form={form}
                        dataSource={todos.todos}
                        mergedColumns={mergedTodoColumns}
                        cancelTodo={cancelTodo}
                    />
                </TabPane>
                <TabPane tab="Users" key="2">
                    <Users
                        userHandler={userHandler}
                        form={form}
                        dataSource={users.users}
                        mergedColumns={mergedUserColumns}
                        cancelUser={cancelUser}
                    />
                </TabPane>
            </Tabs>
            <AddModal
                visibility={visible}
                loading={loading}
                onCreate={createHandler}
                onCancel={hideModal}
                type={modalType}
            />
        </React.Fragment>
    )
}

export default Home

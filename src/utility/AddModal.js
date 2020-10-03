import React, { useCallback, useState, useEffect } from 'react';
import { Form, Button, Modal } from 'antd';
import UserForm from '../components/Users/UserForm';
import TodoForm from '../components/Todos/TodoForm';
import { Modal_Types } from './constants';

const AddModal = ({ visibility, loading, onCancel, onCreate, type }) => {
    const [form] = Form.useForm();

    const [addType, setAddType] = useState(type);

    useEffect(() => {
        setAddType(type);
    }, [type])

    const onSubmit = useCallback((values) => {
        onCreate(values, addType);
    }, [type]);

    return (
        <Modal
            title={`Add New ${type}`}
            centered
            visible={visibility}
            confirmLoading={loading}
            onOk={form.submit}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={form.submit}
                >
                    Create
                </Button>
            ]}
        >
            {type === Modal_Types.USER ? (
                <UserForm form={form} onSubmit={onSubmit} type={type} />
            ) : (
                    <TodoForm form={form} onSubmit={onSubmit} type={type} />
                )}
        </Modal>
    )
}


export default AddModal

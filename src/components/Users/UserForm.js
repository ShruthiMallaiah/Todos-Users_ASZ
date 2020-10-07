import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const UserForm = ({ onSubmit, form, record, mode }) => {

    useEffect(() => {
        if (mode) {
            form.setFieldsValue({
                name: record.name,
                email: record.email
            })
        }
    }, [record])

    return (
        <Form {...layout} onFinish={onSubmit} form={form}>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the name!'
                    },
                ]}
            >
                <Input placeholder="Add your name" value={form.name} />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the email!'
                    },
                ]}
            >
                <Input placeholder="Add your email" value={form.email} />
            </Form.Item>
        </Form>
    )
}

export default UserForm

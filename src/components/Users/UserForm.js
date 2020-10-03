import React from 'react';
import { Form, Input } from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const UserForm = ({ onSubmit, form }) => {

    return (
        <Form {...layout} onFinish={onSubmit} form={form}>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Add your name" />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Add your email" />
            </Form.Item>
        </Form>
    )
}

export default UserForm

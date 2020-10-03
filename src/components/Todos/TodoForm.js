import React from 'react';
import { Form, Input, DatePicker } from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const TodoForm = ({ onSubmit, form }) => {

    return (
        <Form {...layout} onFinish={onSubmit} form={form}>
            <Form.Item
                name="action"
                label="Action"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Add Action here" />
            </Form.Item>
            <Form.Item
                name="dateadded"
                label="DateAdded"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <DatePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm:ss"
                    showToday
                />
            </Form.Item>
        </Form>
    )
}

export default TodoForm

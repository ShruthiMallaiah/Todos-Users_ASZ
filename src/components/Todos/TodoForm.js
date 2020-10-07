import React, { useEffect } from 'react';
import moment from 'moment';
import { Form, Input, DatePicker } from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const TodoForm = ({ onSubmit, form, record, mode }) => {

    useEffect(() => {
        if (mode) {
            form.setFieldsValue({
                action: record.action,
                dateadded: moment(record.dateadded)
            })
        }
    }, [record])

    return (
        <Form {...layout} onFinish={onSubmit} form={form}>
            <Form.Item
                name="action"
                label="Action"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the action!'
                    },
                ]}
            >
                <Input placeholder="Add Action here" value={form.action} />
            </Form.Item>
            <Form.Item
                name="dateadded"
                label="DateAdded"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the date!',
                    },
                ]}
            >
                <DatePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm:ss"
                    showToday
                    value={form.dateadded}
                />
            </Form.Item>
        </Form>
    )
}

export default TodoForm

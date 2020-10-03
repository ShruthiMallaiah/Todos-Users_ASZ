import React from 'react';
import { Button, Table, Form } from 'antd';
import EditableCell from '../../utility/EditableCell';
import '../home.css';

const Todos = ({ todoHandler, form, dataSource, mergedColumns, cancelTodo }) => {
    return (
        <>
            <Button type="primary" onClick={todoHandler} className="btnStyle" size="large">
                <strong>Add Todo</strong>
            </Button>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={dataSource}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancelTodo
                    }}
                />
            </Form>
        </>
    )
}

export default Todos

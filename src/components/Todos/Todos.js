import React from 'react';
import { Button, Table } from 'antd';
import '../home.css';

const Todos = ({ onAddTodo, dataSource, mergedColumns }) => {
    return (
        <>
            <Button type="primary" onClick={onAddTodo} className="btnStyle" size="large">
                <strong>Add Todo</strong>
            </Button>
            <Table
                bordered
                dataSource={dataSource}
                columns={mergedColumns}
            />
        </>
    )
}

export default Todos

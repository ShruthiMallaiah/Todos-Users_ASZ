import React from 'react';
import { Button, Table } from 'antd';
import '../home.css';

const Users = ({ onAddUser, dataSource, mergedColumns }) => {
    return (
        <>
            <Button type="primary" onClick={onAddUser} className="btnStyle" size="large">
                <strong>Add User</strong>
            </Button>
            <Table
                bordered
                dataSource={dataSource}
                columns={mergedColumns}
            />
        </>
    )
}

export default Users

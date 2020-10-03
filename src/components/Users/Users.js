import React from 'react';
import { Button, Table, Form } from 'antd';
import EditableCell from '../../utility/EditableCell';
import '../home.css';


const Users = ({ userHandler, form, dataSource, mergedColumns, cancelUser }) => {
    return (
        <>
            <Button type="primary" onClick={userHandler} className="btnStyle" size="large">
                <strong>Add User</strong>
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
                        onChange: cancelUser
                    }}
                />
            </Form>
        </>
    )
}

export default Users

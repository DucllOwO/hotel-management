import React, { useState } from 'react'
import "./table.css"
import {Table, Button, Modal, Form, Input} from "antd"
import "antd/dist/antd.css"
import { PlusOutlined } from "@ant-design/icons"

const DataTable = () => {

    const [editingRow, setEditingRow] = useState(null)

    const [form] = Form.useForm()

    const [dataSource, setDataSource] = useState([
        {
            id:1,
            name:'John',
            email:'John@gmail.com',
            address:'john Address',
        },
        {
            id:2,
            name:'David',
            email:'David@gmail.com',
            address:'david Address',
        },
        {
            id:3,
            name:'James',
            email:'James@gmail.com',
            address:'james Address',
        },
        {
            id:4,
            name:'Sam',
            email:'Sam@gmail.com',
            address:'sam Address',
        },
    ])

    const columns = [
        {
            key:'1',
            title:'ID',
            dataIndex:'id',
        },
        {
            key:'2',
            title:'Name',
            dataIndex:'name',
            render:(text, record)=>{ 
                if(editingRow === record.id){
                    return (
                        <Form.Item
                            name="name"
                            rules={[
                            {
                                required:true,
                                message:'Please enter the name'
                            },
                        ]}
                        >
                            <Input />
                        </Form.Item>
                    );
                }else{
                    return <p>{text}</p>
                }
            }
        },
        {
            key:'3',
            title:'Email',
            dataIndex:'email',
            render:(text, record)=>{
                if(editingRow === record.id){
                    return (
                        <Form.Item
                            name="email"
                            rules={[
                            {
                                required:true,
                                message:'Please enter the email'
                            },
                        ]}
                        >
                            <Input />
                        </Form.Item>
                    );
                }else{
                    return <p>{text}</p>
                }
            }
        },
        {
            key:'4',
            title:'Address',
            dataIndex:'address',
            render:(text, record)=>{
                if(editingRow === record.id){
                    return (
                        <Form.Item
                            name="address"
                            rules={[
                            {
                                required:true,
                                message:'Please enter the address'
                            },
                        ]}
                        >
                            <Input />
                        </Form.Item>
                    );
                }else{
                    return <p>{text}</p>
                }
            }
        },
        {
            key:'5', 
            title:'Actions',
            render:(_,record)=>{

                if(editingRow !== null){
                    if(editingRow === record.id){
                        return(
                            <>
                                <Button 
                                htmlType="submit"
                                // onClick={() => {form.submit()}}
                                >save</Button>
                                <Button onClick={()=>{setEditingRow(null)}}>cancel</Button>
                            </>
                        )
                    }
                    else
                    {
                        
                    }
                }
                else {
                    return (
                        <>
                            <Button onClick={(e) => {
                                e.preventDefault()
                                setEditingRow(record.id)
                                form.setFieldsValue({
                                    name:record.name,
                                    email:record.email,
                                    address:record.address
                                })
                            }}
                            >edit</Button>
                            <Button onClick={()=>{onDeleteButton(record)}}>delete</Button>
                        </>
                    )
                }
            }
        },
    ];

    const onAddButton=()=>{
        const randomNumber = parseInt(Math.random()*1000)
        const newData = {
            id:''+parseInt(dataSource.length+1),
            name:'Name '+randomNumber,
            email:randomNumber+'@gmail.com',
            address:randomNumber+' Address',
        }

        setDataSource(pre=>{
            return [...pre, newData]
        });
    };

    const onDeleteButton=(record) => {
        Modal.confirm({
            title:'Are you sure, you want to delete this record?',
            okText:'Yes',
            okType:'danger',
            onOk:() =>{
                setDataSource((pre)=>{
                    return (
                        pre.filter((data) => data.id !== record.id)
                    )
                });
            },
        });
    };

    const onFinish = (values) => {
        console.log(editingRow)
        const updateDataSource = [...dataSource]
        updateDataSource.splice(editingRow-1,1,{...values, id:editingRow})
        console.log(updateDataSource)
        setDataSource(updateDataSource)
        setEditingRow(null)
    }

  return (
    <div className='table'>
        {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
        <div className="buttonContainer">
            <Button onClick={onAddButton} className='addButton' type="primary" ghost icon={<PlusOutlined />}>Add new</Button>
        </div>
        <Form form={form} onFinish={onFinish}>
            <Table
                columns={columns}
                dataSource={dataSource}
            >
            </Table>
        </Form>
    </div>
  )
}

export default DataTable
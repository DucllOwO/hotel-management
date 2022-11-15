import React, { useState } from 'react'
import "../index.css"
import {Table, Button, Modal, Form, Input} from "antd"
import "antd/dist/antd.less"
import {PlusOutlined} from "@ant-design/icons"

const UtilitiesTable = () => {

    const [editingRow, setEditingRow] = useState(null)

    const [form] = Form.useForm()

    const [searchedText, setSearchedText] = useState("")

    const [dataSource, setDataSource] = useState([
        {
            idNum:1,
            name:'John',
        },
        {
            idNum:2,
            name:'David',
        },
        {
            idNum:3,
            name:'James',
        },
        {
            idNum:4,
            name:'Sam',
        },
    ])

    const columns = [
        {
            key:'1',
            title:'ID',
            dataIndex:'idNum',
        },
        {
            key:'2',
            title:'Name',
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return (
                    String(record.name).toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
                    String(record.price).toLocaleLowerCase().includes(value.toLocaleLowerCase())                    
                )
            },
            dataIndex:'name',
            render:(text, record)=>{ 
                if(editingRow === record.idNum){
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
            key:'4', 
            title:'Actions',
            render:(_,record)=>{

                if(editingRow !== null){
                    if(editingRow === record.idNum){
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
                                setEditingRow(record.idNum)
                                form.setFieldsValue({
                                    name:record.name,
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
            idNum:''+parseInt(dataSource.length+1),
            name:'Name '+randomNumber,
            price:'200.000'
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
                        pre.filter((data) => data.idNum !== record.idNum)
                    )
                });
            },
        });
    };

    const onFinish = (values) => {
        console.log(editingRow)
        const updateDataSource = [...dataSource]
        updateDataSource.splice(editingRow-1,1,{...values, idNum:editingRow})
        console.log(updateDataSource)
        setDataSource(updateDataSource)
        setEditingRow(null)
    }

  return (
    <div className='table'>
        {/* <Button onClick={onAddButton} type='primary'>Add</Button> */}
        <div className="buttonContainer">
            <Input.Search onSearch={(value)=>{
                setSearchedText(value)
            }}
            onChange={(e) => {
                setSearchedText(e.target.value)
            }}
            placeholder="input search text" 
            className='searchInput' 
            style={{width:264}}/>
            <Button onClick={onAddButton} className='addButton' type="primary" ghost icon={<PlusOutlined />}>Add new</Button>
        </div>
        <Form form={form} onFinish={onFinish} className="form">
            <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{y: 350}}
            >
            </Table>
        </Form>
    </div>
  )
}

export default UtilitiesTable
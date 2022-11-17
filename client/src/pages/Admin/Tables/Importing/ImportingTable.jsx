import React, { useState } from 'react'
import "../index.css"
import {Table, Button, Modal, Form, Input} from "antd"
import "antd/dist/antd.less"
import {PlusOutlined} from "@ant-design/icons"

const ImportingTable = () => {

    const [editingRow, setEditingRow] = useState(null)

    const [form] = Form.useForm()

    const [searchedText, setSearchedText] = useState("")

    const [dataSource, setDataSource] = useState([
        {
            idNum:1,
            date:'John',
            total:'20',
        },
        {
            idNum:2,
            date:'David',
            total:'20',
        },
        {
            idNum:3,
            date:'James',
            total:'J20',
        },
        {
            idNum:4,
            date:'Sam',
            total:'20',
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
            title:'Date',
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return (
                    String(record.date).toLocaleLowerCase().includes(value.toLocaleLowerCase())
                )
            },
            dataIndex:'date',
            render:(text, record)=>{ 
                if(editingRow === record.idNum){
                    return (
                        <Form.Item
                            name="date"
                            rules={[
                            {
                                required:true,
                                message:'Please enter the date'
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
            title:'Total',
            dataIndex:'total',
            render:(text, record)=>{
                if(editingRow === record.idNum){
                    return (
                        <Form.Item
                            name="total"
                            rules={[
                            {
                                required:true,
                                message:'Please enter the total'
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
                                    date:record.date,
                                    total:record.total,
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
            amount:'20',
            price: randomNumber + ' price'
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

export default ImportingTable
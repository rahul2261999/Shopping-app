import React, { useState } from 'react'
import {
    OrderContainer,
    Header,
    SubHeader,
    TableHead,
    TableRow,
    HeadValue,
    RowData,
    Icon,
    DropContainer,
    DropIcon
} from './Style'
import { FaCog, FaCaretDown, FaRupeeSign, FaCircle } from 'react-icons/fa'
import {Dropdown} from 'semantic-ui-react'

const options = [
    { key: 'processing', value: 'processing', text: 'Processing',flag:<DropIcon as={FaCircle} color="#e3a167" /> },
    { key: 'confirmed', value: 'confirmed', text: 'Confirmed',flag:<DropIcon as={FaCircle} color="#67e00c" /> },
]

const Orders = props => {
    const [dropValue,setDropValue] = useState('processing')
    
    const valueHandler = (e,{value}) =>{
        console.log(value);
        setDropValue(value)
    }
    return (
        <OrderContainer>
            <Header>Orders</Header>
            <SubHeader>23 orders found</SubHeader>
            <TableHead>
                <HeadValue >Id</HeadValue>
                <HeadValue>Ordered Date</HeadValue>
                <HeadValue>Customer</HeadValue>
                <HeadValue>Status</HeadValue>
                <HeadValue>Total Amount</HeadValue>
                <HeadValue maxWidth="120px">Paid</HeadValue>
                <HeadValue maxWidth="120px">Actions</HeadValue>
            </TableHead>
            <TableRow>
                <HeadValue >
                    <RowData>s5f4g18ff5f4f54f8f45</RowData>
                </HeadValue>
                <HeadValue>
                    <RowData>23 June 2020</RowData>
                </HeadValue>
                <HeadValue>
                    <RowData>Rahul Saini</RowData>
                </HeadValue>
                <HeadValue>
                    <RowData
                        nooverflow
                        position="absolute">
                        <DropContainer as={Dropdown}
                            Icon="dropdown"
                            defaultValue={dropValue}
                            options={options}
                            placeholder='Status'
                            fluid
                            selection
                            color={dropValue==="processing"?"#ffc38f":"#67e00c"}
                            onChange={valueHandler}
                            />
                    </RowData>
                </HeadValue>
                <HeadValue>
                    <FaRupeeSign /><RowData> 50000</RowData>
                </HeadValue>
                <HeadValue maxWidth="120px">
                    <RowData>unpaid</RowData>
                </HeadValue>
                <HeadValue maxWidth="120px">
                    <Icon as={FaCog} />
                </HeadValue>
            </TableRow>

        </OrderContainer>
    )
}

export default Orders
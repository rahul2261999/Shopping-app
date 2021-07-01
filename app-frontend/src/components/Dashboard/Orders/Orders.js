import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { FaCog, FaRupeeSign, FaCircle } from 'react-icons/fa'
import { Dropdown } from 'semantic-ui-react'
import { getUser } from '../../../utilities/helperFunction'
import { adminGetAllUserOrderInit } from '../../../redux/actions/cartorder'
import { memoizedcartorder } from '../../../redux/selector/cartorder'
import Loader from '../../../utilities/Loader/Loader'

const options = [
    { key: 'processing', value: 'processing', text: 'Processing', flag: <DropIcon as={FaCircle} color="#e3a167" /> },
    { key: 'confirmed', value: 'confirmed', text: 'Confirmed', flag: <DropIcon as={FaCircle} color="#67e00c" /> },
]

const Orders = () => {
    const dispatch = useDispatch();
    const { token } = getUser();
    const { loading, orders, } = useSelector(memoizedcartorder)
    const [dropValue, setDropValue] = useState('processing')

    const valueHandler = (e, { value }) => {
        console.log(value);
        setDropValue(value)
    }

    useEffect(() => {
        dispatch(adminGetAllUserOrderInit(token))
    }, [dispatch, token])

    const orderList = orders.map(order => {
        return (
            <TableRow key={order._id}>
                <HeadValue >
                    <RowData>{order._id}</RowData>
                </HeadValue>
                <HeadValue>
                    <RowData>23 June 2020</RowData>
                </HeadValue>
                <HeadValue>
                    <RowData>{order.customer_details.customer_name}</RowData>
                </HeadValue>
                <HeadValue>
                    <RowData
                        nooverflow
                        position="absolute">
                        <DropContainer as={Dropdown}
                            Icon="dropdown"
                            defaultValue={order.order_status.toLowerCase()}
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
                    <FaRupeeSign /><RowData>{order.total_amount}</RowData>
                </HeadValue>
                <HeadValue maxWidth="120px">
                    <RowData>unpaid</RowData>
                </HeadValue>
                <HeadValue maxWidth="120px">
                    <Icon as={FaCog} />
                </HeadValue>
            </TableRow>
        )
    })

    if (loading) {
        return <Loader />
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
            {orderList.length>0?orderList:"No orders available"}
        </OrderContainer>
    )
}

export default Orders
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from 'react-tooltip';
import {
  FaCog, FaRupeeSign, FaCircle, FaChevronDown
} from 'react-icons/fa';

import { getUser } from '../../../utilities/helperFunction';
import { adminGetAllUserOrderInit, updateOrderStatusInit } from '../../../redux/actions/cartorder';
import { memoizedcartorder } from '../../../redux/selector/cartorder';
import Loader from '../../../utilities/Loader/Loader';

import {
  OrderContainer,
  Header,
  SubHeader,
  TableHead,
  TableRow,
  HeadValue,
  RowData,
  Icon,
  DropDown,
  DropList,
  DropValue
} from './Style';

const Orders = () => {
  const dispatch = useDispatch();
  const { token } = getUser();
  const { loading, orders } = useSelector(memoizedcartorder);

  useEffect(() => {
    dispatch(adminGetAllUserOrderInit(token));
  }, [dispatch, token]);

  const orderStatusValueHandler = (id, status) => {
    dispatch(updateOrderStatusInit({ id, status, token }));
  };

  const orderList = orders.map((order) => (
    <TableRow key={order._id}>
      <HeadValue>
        <RowData data-tip={order._id}>{order._id}</RowData>
      </HeadValue>
      <HeadValue>
        <RowData>23 June 2020</RowData>
      </HeadValue>
      <HeadValue>
        <RowData>{order.customer_details.customer_name}</RowData>
      </HeadValue>
      <HeadValue noOverflow>
        <DropValue
          color={order.order_status === 'Processing' ? '#feb043' : '#3fd057'}
        >
          <Icon
            font={8}
            marginRight="8px"
            as={FaCircle}
          />
          {order.order_status}
          <Icon
            font="14"
            as={FaChevronDown}
          />

          <DropDown>
            <DropList
              color="#feb043"
              onClick={() => orderStatusValueHandler(order._id, 'Processing')}
            >
              <Icon
                font={8}
                marginRight="8px"
                as={FaCircle}
              />
              Processing
            </DropList>
            <DropList
              color="#3fd057"
              onClick={() => orderStatusValueHandler(order._id, 'Completed')}
            >
              <Icon
                font={8}
                marginRight="8px"
                as={FaCircle}
              />
              Completed
            </DropList>
          </DropDown>
        </DropValue>
      </HeadValue>
      <HeadValue>
        <FaRupeeSign />
        <RowData>{order.total_amount}</RowData>
      </HeadValue>
      <HeadValue maxWidth="120px">
        <RowData>unpaid</RowData>
      </HeadValue>
      <HeadValue maxWidth="120px">
        <Icon as={FaCog} />
      </HeadValue>
    </TableRow>
  ));

  if (loading) {
    return <Loader />;
  }

  return (
    <OrderContainer>
      <Header>Orders</Header>
      <SubHeader>
        {orders.length}
        {' '}
        orders found
      </SubHeader>
      <TableHead>
        <HeadValue>Id</HeadValue>
        <HeadValue>Ordered Date</HeadValue>
        <HeadValue>Customer</HeadValue>
        <HeadValue>Status</HeadValue>
        <HeadValue>Total Amount</HeadValue>
        <HeadValue maxWidth="120px">Paid</HeadValue>
        <HeadValue maxWidth="120px">Actions</HeadValue>
      </TableHead>
      {orderList.length > 0 ? orderList : 'No orders available'}
      <Tooltip />
    </OrderContainer>
  );
};

export default Orders;

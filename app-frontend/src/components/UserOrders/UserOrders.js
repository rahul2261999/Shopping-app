import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRupeeSign } from 'react-icons/fa';

import { getUserOrderInit } from '../../redux/actions/cartorder';
import { memoizedcartorder } from '../../redux/selector/cartorder';
import { getUser } from '../../utilities/helperFunction';
import Loader from '../../utilities/Loader/Loader';

import {
  Wrapper,
  FlexContainer,
  Title,
  OrderId,
  FlexLeft,
  FlexRight,
  CardContainer,
  CardHeading,
  TableHeading,
  TableValue
} from './styles';

const UserOrders = () => {
  const dispatch = useDispatch();
  const { loading, userOrders } = useSelector(memoizedcartorder);
  const { token } = getUser();

  const [expandList, setExpandList] = useState([]);

  const expandListHandler = (id) => {
    let newExpandList = [];
    if (expandList.includes(id)) {
      newExpandList = expandList.filter((_id) => _id !== id);
    } else {
      newExpandList = [...expandList, id];
    }

    setExpandList(newExpandList);
  };

  useEffect(() => {
    dispatch(getUserOrderInit(token));
  }, [dispatch, token]);

  if (loading) {
    return <Loader />;
  }

  const Orders = userOrders.map((order) => (
    <Wrapper
      key={order._id}
      expandList={expandList.includes(order._id)}
      onClick={() => expandListHandler(order._id)}
    >
      <FlexContainer
        font="20px"
        centered
        row
      >
        <Title>Order</Title>
        <OrderId>
          #
          {order._id}
        </OrderId>
      </FlexContainer>
      <FlexContainer className="dd">
        <FlexLeft>
          <CardContainer>
            <CardHeading>
              <TableHeading>Items Summary</TableHeading>
              <TableHeading>QTY</TableHeading>
              <TableHeading>Price</TableHeading>
              <TableHeading>Total Price</TableHeading>
            </CardHeading>
            {order.product_purchased.map((item) => (
              <CardHeading key={item.product_id._id}>
                <TableValue>{item.product_id.prod_name}</TableValue>
                <TableValue>{item.quantity}</TableValue>
                <TableValue>
                  {' '}
                  <FaRupeeSign />
                  {' '}
                  {item.product_id.prod_price}
                </TableValue>
                <TableValue>
                  {' '}
                  <FaRupeeSign />
                  {' '}
                  {item.total_price}
                </TableValue>
              </CardHeading>
            ))}
          </CardContainer>

          {/* user details */}
          <CardContainer
            textAlign="left"
            childFont="12px"
            childFontWeight="600"
          >
            <CardHeading>
              <TableHeading Size={16}>Customer and Order Details</TableHeading>
            </CardHeading>
            <CardHeading>
              <TableHeading>Customer Name</TableHeading>
              <TableValue>{order.customer_details.customer_name}</TableValue>
            </CardHeading>
            <CardHeading>
              <TableHeading>Phone Number</TableHeading>
              <TableValue>{order.customer_details.customer_mobile}</TableValue>
            </CardHeading>
            <CardHeading>
              <TableHeading>Payment</TableHeading>
              <TableValue>{order.delivery}</TableValue>
            </CardHeading>
            <CardHeading noBorder>
              <TableHeading>Status</TableHeading>
              <TableValue>{order.order_status}</TableValue>
            </CardHeading>
          </CardContainer>
        </FlexLeft>

        {/* right side */}
        <FlexRight>
          <CardContainer>
            <FlexContainer>
              <Title>Rider Detail</Title>
            </FlexContainer>
          </CardContainer>
          {/* order summary */}
          <CardContainer
            textAlign="left"
            childFont="12px"
            childFontWeight="600"
          >
            <CardHeading>
              <TableHeading>Order Summary</TableHeading>
            </CardHeading>
            <CardHeading>
              <TableHeading>Order Created</TableHeading>
              <TableValue>April 22 2020</TableValue>
            </CardHeading>
            <CardHeading>
              <TableHeading>Subtotal</TableHeading>
              <TableValue>
                <FaRupeeSign />
                {' '}
                {order.total_amount}
              </TableValue>
            </CardHeading>
            <CardHeading noBorder>
              <TableHeading>Delivery Fee</TableHeading>
              <TableValue>Free</TableValue>
            </CardHeading>
          </CardContainer>
          {/* total */}
          <CardContainer
            textAlign="left"
            childFont="12px"
            childFontWeight="600"
          >
            <CardHeading noBorder>
              <TableHeading>Total</TableHeading>
              <TableValue>
                <FaRupeeSign />
                {' '}
                {order.total_amount}
              </TableValue>
            </CardHeading>
          </CardContainer>
          {/* address details */}
          <CardContainer
            textAlign="left"
            childFont="12px"
            childFontWeight="600"
          >
            <CardHeading>
              <TableHeading Size={16}>Address</TableHeading>
            </CardHeading>
            <CardHeading noBorder>
              <TableValue fontWeigth={500}>
                {order.customer_details.customer_address.shipping_address}
                ,
                {order.customer_details.customer_address.city}
                ,
                {order.customer_details.customer_address.state}
                ,
                {order.customer_details.customer_address.zipcode}
              </TableValue>
            </CardHeading>
          </CardContainer>

        </FlexRight>
      </FlexContainer>
    </Wrapper>
  ));

  return (
    <div style={{ paddingBottom: '10px' }}>
      {' '}
      {Orders}
    </div>
  );
};

export default UserOrders;

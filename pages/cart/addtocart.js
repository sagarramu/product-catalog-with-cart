import { Card, Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
const { Content } = Layout;
import { PlusSquareFilled, DeleteFilled, MinusSquareFilled } from '@ant-design/icons';
import { toast } from 'react-toastify';
import AppHeader from '@/component/appHeader';
import AppFooter from '@/component/appFooter';

const AddToCart = () => {
  const [cartItemsStore, setCartItemsStore] = useState([]);

  useEffect(() => {
    setCartItemsStore(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  const increase = (qty, sku) => {
    const exist = cartItemsStore?.find((x) => x?.sku === sku);
    if (exist) {
      const newItems = cartItemsStore?.map((x) =>
        x?.sku === sku ? { ...exist, qty: exist?.qty + 1 } : x
      );
      setCartItemsStore(newItems);
    }
  };

  const decrese = (qty, sku) => {
    const exist = cartItemsStore?.find((x) => x?.sku === sku);
    if (exist && exist?.qty > 1) {
      const newItems = cartItemsStore?.map((x) =>
        x?.sku === sku ? { ...exist, qty: exist?.qty - 1 } : x
      );
      setCartItemsStore(newItems);
    }
  };

  let afterDeleteFromCart;
  const deleteFun = (id) => {
    afterDeleteFromCart = cartItemsStore?.filter((ele) => {
      return ele?.sku !== id;
    });
    setCartItemsStore(afterDeleteFromCart);
    localStorage.setItem("cartItems", JSON.stringify(afterDeleteFromCart));
    toast.error('Product deleted sucessfully');
  };

  const subTotal = cartItemsStore?.reduce((accum, currenVal) => {
    return accum + currenVal?.sale_price * currenVal?.qty;
  }, 0);

  return (
    <>
      <Head>
        <title>Add to Cart</title>
        <meta name="description" content="Add to Cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <>
          <Layout>
            <AppHeader menutype="Cart" />

            <Content
              style={{
                padding: '0 50px',
              }}
            >
              <div className="main-div">
                <div className="cart-list">
                  <p className="cart-list-title">Cart Items</p>
                  <div className="scroller1">
                    {cartItemsStore && cartItemsStore.length === 0 && (
                      <span className="no-items">No Items Added to Cart</span>
                    )}
                    {cartItemsStore?.map((ele) => {
                      return (
                        <>
                          <div key={ele?.sku}>
                            <div className="d-flex">
                              <div>
                                <img
                                  src={ele?.image}
                                  alt={ele?.title}
                                  className="mx-2 cart-image"
                                  width="130px"
                                  height="130px"
                                />
                              </div>
                              <div style={{ width: "100%" }}>
                                <p className="mx-2 product-name">{ele?.title}</p>
                                <span className="mx-2">
                                  <b>Price:</b> Rs. {ele?.sale_price}
                                </span>
                                <span>
                                  <b>Qty:</b> {ele?.qty}
                                </span>
                                <span className="mx-2">
                                  <b>Total Price: </b>
                                  Rs. {ele?.sale_price * ele?.qty}
                                </span>
                                <div className="my-2 mx-2">

                                  <PlusSquareFilled
                                    onClick={() => increase(ele?.qty, ele?.sku)}
                                    style={{ fontSize: '25px' }}
                                  />
                                  <MinusSquareFilled
                                    onClick={() => decrese(ele?.qty, ele?.sku)}
                                    style={{ fontSize: '25px' }}
                                  />

                                </div>
                                <div className="trash-btn">
                                  <DeleteFilled
                                    onClick={() => deleteFun(ele?.sku)}
                                    style={{ fontSize: '25px' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </>
                      );
                    })}
                  </div>
                  {subTotal > 0 &&
                    <h5 className="sub-total">Sub-Total: Rs. {subTotal}</h5>
                  }
                </div>
              </div>
            </Content>
            <AppFooter />
          </Layout>
        </>
      </main>
    </>
  );
};
export default AddToCart; 
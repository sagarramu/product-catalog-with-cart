import { Avatar, Button, Card, Layout, List, Breadcrumb, Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import VirtualList from 'rc-virtual-list';
import Head from 'next/head';
const { Content } = Layout;
const { Meta } = Card;
import { toast } from 'react-toastify';
import { HeartFilled } from '@ant-design/icons';
import AppHeader from '@/component/appHeader';
import AppFooter from '@/component/appFooter';
import { prodData } from '../public/data/product';

const ProductListPage = () => {
  const [listView, setListView] = useState(true);
  const [change, setChange] = useState(false);
  const [change2, setChange2] = useState([]);

  const addToCartFun = (ele) => {
    change2?.push(ele);
    setChange(true);
  };

  useEffect(() => {
    if (change) {
      if (localStorage.getItem("cartItems")) {
        const exist = JSON.parse(localStorage.getItem("cartItems"))?.find((x) => x.sku == change2[0]?.sku);
        if (exist) {
          const newItems = JSON.parse(localStorage.getItem("cartItems"))?.map((x) =>
            x?.sku === change2[0]?.sku ? { ...exist, qty: exist?.qty + 1 } : x
          );

          var isFlag = false;
          newItems?.map((x) => {
            if (x?.qty > x?.qtylimit) {
              isFlag = true;
            }
          }
          );

          if (isFlag) {
            toast.error('You can not order more then the order qty');
          } else {
            localStorage.setItem("cartItems", JSON.stringify(newItems));
            toast.success('Product added sucessfully');
          }
        } else {
          const newItems = [...JSON.parse(localStorage.getItem("cartItems")), change2[0]];
          localStorage.setItem("cartItems", JSON.stringify(newItems));
          toast.success('Product added sucessfully');
        }
        setChange2([]);
      } else {
        localStorage.setItem("cartItems", JSON.stringify(change2));
        setChange2([]);
        toast.success('Product added sucessfully');
      }
      setChange(false);
    }
  }, [change]);

  const onChange = (checked) => {
    setListView(checked);
  };

  const productCompare = (data) => {
    if (localStorage.getItem("productCompare")) {
      const exist = JSON.parse(localStorage.getItem("productCompare"))?.find((x) => x.sku == data[0]?.sku);
      if (JSON.parse(localStorage.getItem("productCompare")).length === 3) {
        toast.error('Maximum you can compare 3 products');
      } else {
        if (exist) {
          toast.error('Product already exist');
        } else {
          const newItems = [...JSON.parse(localStorage.getItem("productCompare")), data[0]];
          localStorage.setItem("productCompare", JSON.stringify(newItems));
          toast.success('Product added for compare sucessfully');
        }
      }
    } else {
      localStorage.setItem("productCompare", JSON.stringify(data));
      toast.success('Product added for compare sucessfully');
    }
  }

  return (
    <>
      <Head>
        <title>Product List</title>
        <meta name="description" content="Product List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <>
          <Layout>
            <AppHeader menutype="Productlist" />
            <Content
              style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                {listView === true ?
                  <Breadcrumb.Item> List View</Breadcrumb.Item>
                  : <Breadcrumb.Item>Grid View</Breadcrumb.Item>
                }
              </Breadcrumb>
            </Content>
            <Content
              style={{
                padding: '15px 50px',
              }}>
              <Switch defaultChecked onChange={onChange} />
            </Content>
            <Content
              style={{
                padding: '0 50px',
              }}
            >
              {listView === true &&
                <List>
                  <VirtualList
                    data={prodData}
                    itemKey="title"
                  >
                    {(item) => (
                      <List.Item key={item.title}
                      >
                        <List.Item.Meta
                          avatar={<Avatar size={100} src={item.image} />}
                          title={<a href="#">{item.title}</a>}
                          description={<strong> {'Price : ' + 'Rs. ' + item.sale_price}  </strong>}
                        />
                        <Button className='primary' onClick={() => addToCartFun(item)}>Add To Cart</Button>
                        <a title='Compare Product'>
                          <HeartFilled
                            onClick={() => productCompare([item])}
                            style={{ fontSize: '18px', marginTop: '2px', marginLeft: '5px' }}
                          />
                        </a>
                      </List.Item>
                    )}
                  </VirtualList>
                </List>
              }

              {listView !== true &&
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 3,
                  }}
                  dataSource={prodData}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        hoverable
                        style={{ width: 240, height: 400 }}
                        cover={<img alt={item.title} src={item.image} height="250" />}
                      >
                        <Meta title={item.title} />
                        <p><strong>Price</strong> : Rs. {item.sale_price}</p>
                        <Button className='primary mt-8' title='Add to Cart' onClick={() => addToCartFun(item)}>Add To Cart</Button>
                        &nbsp;
                        <a title='Compare Product'>
                          <HeartFilled
                            className='mt-8'
                            onClick={() => productCompare([item])}
                            style={{ fontSize: '18px', marginTop: '2px' }}
                          />
                        </a>
                      </Card>
                    </List.Item>
                  )}
                />
              }
            </Content>
            <AppFooter />
          </Layout>
        </>
      </main>
    </>
  );
};
export default ProductListPage;

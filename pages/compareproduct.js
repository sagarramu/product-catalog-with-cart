import { Button, Layout, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
const { Content } = Layout;
import { toast } from 'react-toastify';
import AppHeader from '@/component/appHeader';
import AppFooter from '@/component/appFooter';
import { DeleteFilled } from '@ant-design/icons';

const CompareProduct = () => {
  const [productCompareStore, setProductCompareStore] = useState([]);

  useEffect(() => {
    setProductCompareStore(JSON.parse(localStorage.getItem("productCompare")));
  }, []);

  let afterDeleteFromCart;
  const deleteFun = (id) => {
    afterDeleteFromCart = productCompareStore?.filter((ele) => {
      return ele?.sku !== id;
    });
    setProductCompareStore(afterDeleteFromCart);
    localStorage.setItem("productCompare", JSON.stringify(afterDeleteFromCart));
    toast.error('Product deleted sucessfully');
  };

  const columns = [
    {
      title: 'Product Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => {
        return <img
          src={record.image}
          alt={record.title}
          className="mx-2 cart-image"
          width="130px"
          height="130px"
        />;
      },
    },
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Product Sku',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Product Price',
      dataIndex: 'sale_price',
      key: 'sale_price',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => {
        return <DeleteFilled onClick={() => deleteFun(record?.sku)} style={{ fontSize: '25px' }} />
      }
    },
  ];

  return (
    <>
      <Head>
        <title>Compare Product</title>
        <meta name="description" content="Compare Product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <>
          <Layout>
            <AppHeader menutype="CompareProduct" />
            <Content
              style={{
                padding: '50px',
                textAlign: 'center',
                height: 500
              }}
            >
              <Table dataSource={productCompareStore} columns={columns} pagination={false} />;
            </Content>
            <AppFooter />
          </Layout>
        </>
      </main>
    </>
  );
};
export default CompareProduct;
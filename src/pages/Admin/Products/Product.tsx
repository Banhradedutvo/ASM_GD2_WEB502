import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Space, Image } from 'antd';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category_id: number;
};

type ProductPageProps = {
  products: Product[];
  removeProduct: (id: number) => void;
};

const ProductPage: React.FC<ProductPageProps> = ({ products, removeProduct }) => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <Image src={image} alt="Lỗi ảnh" style={{ maxWidth: '100px' }} />,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category_id',
      key: 'category_id',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space>
          <Button onClick={() => onHandleRemove(record.id)}>Delete</Button>
          <Link to={`/admin/product/update/${record.id}`}>
            <Button>Update</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const dataSource = useMemo(
    () =>
      products.map((item) => ({
        ...item,
        key: item.id,
      })),
    [products]
  );

  const onHandleRemove = (id: number) => {
    removeProduct(id);
  };

  return (
    <div className="product-page">
      <Link to="/admin/product/add">
        <Button type="primary">Add New Product</Button>
      </Link>
      <div className="table-container">
        <Table dataSource={dataSource} columns={columns} bordered style={{ maxWidth: '800px' }} />
      </div>
    </div>
  );
};

export default ProductPage;
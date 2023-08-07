import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  category_id: string;
};

type UpdateProductPageProps = {
  products: Product[];
  onUpdate: (product: Product) => void;
};

const UpdateProductPage: React.FC<UpdateProductPageProps> = ({ products, onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const currentProduct = products.find((product) => product.id.toString() === id);
  const [inputValues, setInputValues] = useState<Product | undefined>(currentProduct);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newData = { ...inputValues, [name]: value };
    setInputValues(newData as Product);
  };

  const onHandleSubmit = (values: Product) => {
    const dataUpdate = { ...values, id: parseInt(id) };
    onUpdate(dataUpdate);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: '0 auto' }}
      initialValues={currentProduct}
      onFinish={onHandleSubmit}
      onFinishFailed={console.log}
      autoComplete="off"
    >
      <Form.Item
        label="Productname"
        name="name"
        rules={[{ required: true, message: 'Please input your Productname!' }]}
      >
        <Input onChange={onHandleChange} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input your price!' }]}
      >
        <Input onChange={onHandleChange} />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input your Description!' }]}
      >
        <Input onChange={onHandleChange} />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category_id"
        rules={[{ required: true, message: 'Please input your Category!' }]}
      >
        <Input onChange={onHandleChange} />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: 'Please input your Image!' }]}
      >
        <Input onChange={onHandleChange} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
        <DoubleRightOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProductPage;
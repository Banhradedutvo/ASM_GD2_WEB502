import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

type Product = {
  name: string;
  price: string;
  image: string;
  description: string;
  category_id: number;
};

type AddProductPageProps = {
  addProduct: (product: Product) => void;
};

const AddProductPage: React.FC<AddProductPageProps> = ({ addProduct }) => {
  const [data, setData] = useState<Product>({
    name: '',
    price: '',
    image: '',
    description: '',
    category_id: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onHandleChange = (name: string, value: any) => {
    const newData = { ...data, [name]: value };
    setData(newData);
  };

  const onHandleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    if (!data.name || !data.price) {
      setSubmitError('Chưa được thêm.');
      setIsSubmitting(false);
      return;
    }

    try {
      await addProduct(data);
      alert('Thêm thành công!');
      setData({
        name: '',
        price: '',
        image: '',
        description: '',
        category_id: 0,
      });
    } catch (error: any) {
      console.error(error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validatePrice = (_: any, value: any) => {
    if (value > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be a non-negative number.'));
  };

  const validateCategory = (_: any, value: any) => {
    if (value > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Category must be a non-negative number.'));
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: '0 auto' }}
      onFinish={onHandleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: 'Please input the product name!' }]}
      >
        <Input onChange={(e) => onHandleChange('name', e.target.value)} value={data.name} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: 'Please input the price!' },
          { validator: validatePrice },
        ]}
      >
        <Input onChange={(e) => onHandleChange('price', e.target.value)} value={data.price} />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input onChange={(e) => onHandleChange('description', e.target.value)} value={data.description} />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category_id"
        rules={[
          { required: true, message: 'Please input the category!' },
          { validator: validateCategory },
        ]}
      >
        <InputNumber onChange={(value) => onHandleChange('category_id', value)} value={data.category_id} />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: 'Please input the image!' }]}
      >
        <Input onChange={(e) => onHandleChange('image', e.target.value)} value={data.image} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          <DoubleRightOutlined /> Add Product
        </Button>
      </Form.Item>

      {submitError && <div>Lỗi khi thêm sản phẩm: {submitError}</div>}
    </Form>
  );
};

export default AddProductPage;
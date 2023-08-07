import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

type Category = {
  id: number;
  name: string;
};

type UpdateCategoryPageProps = {
  categories: Category[];
  onUpdate: (category: Category) => void;
};

const UpdateCategoryPage: React.FC<UpdateCategoryPageProps> = ({ categories, onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const currentCategory = categories.find((category) => category.id === +id);
  const [inputValues, setInputValues] = useState<Category | undefined>(currentCategory);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => {
      if (prevValues) {
        return { ...prevValues, [name]: value };
      }
      return prevValues;
    });
  };

  const onHandleSubmit = () => {
    if (!inputValues) {
      // Xử lý khi inputValues là null hoặc undefined
      console.log('Dữ liệu không hợp lệ');
      return;
    }

    const dataUpdate = { ...inputValues, id: parseInt(id) };
    onUpdate(dataUpdate);
  };

  return (
    <div>
      <Form layout="vertical" onFinish={onHandleSubmit} initialValues={{ name: currentCategory?.name }}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: 'Please enter category name' }]}
        >
          <Input onChange={onHandleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCategoryPage;
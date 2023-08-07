import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Form, Input } from 'antd';

type Category = {
  name: string;
};

type AddCategoryPageProps = {
  addCategory: (category: Category) => void;
};

const AddCategoryPage: React.FC<AddCategoryPageProps> = ({ addCategory }) => {
  const [data, setData] = useState<Category>({ name: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newData = { ...data, [name]: value };
    setData(newData);
  };

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    if (!data.name) {
      setSubmitError('Chưa được thêm.');
      setIsSubmitting(false);
      return;
    }

    try {
      await addCategory(data);
      alert('Thêm thành công!');
      setData({ name: '' });
    } catch (error: any) {
      console.error(error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form style={{ maxWidth: 400, margin: '0 auto' }} onFinish={onHandleSubmit}>
      <Form.Item
        label="Category Name"
        name="name"
        rules={[{ required: true, message: 'Please input the category name!' }]}
      >
        <Input value={data.name} onChange={onHandleChange} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add New'}
        </Button>
      </Form.Item>

      {submitError && <div>Lỗi khi thêm sản phẩm: {submitError}</div>}
    </Form>
  );
};

export default AddCategoryPage;
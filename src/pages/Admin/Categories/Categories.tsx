import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';

type Category = {
  id: number;
  name: string;
};

type CategoryPageProps = {
  categories: Category[];
  removeCategory: (id: number) => void;
};

const CategoryPage: React.FC<CategoryPageProps> = ({ categories, removeCategory }) => {
  const columns = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text: string, record: Category) => (
          <span>
            <Button onClick={() => onHandleRemove(record.id)}>Delete</Button>
            <Link to={`/admin/category/update/${record.id}`}>
              <Button>Update</Button>
            </Link>
          </span>
        ),
      },
    ],
    []
  );

  const onHandleRemove = (id: number) => {
    console.log('Category: ', id);
    removeCategory(id);
  };

  const dataSource = useMemo(() => categories.map(category => ({ ...category, key: category.id })), [categories]);

  return (
    <div>
      <Link to="/admin/category/add">
        <Button type="primary">Add New Category</Button>
      </Link>
      <Table columns={columns} dataSource={dataSource} bordered />
    </div>
  );
};

export default CategoryPage;
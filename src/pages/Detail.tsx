import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Image, Descriptions, Divider, Space } from 'antd';

const { Title, Text } = Typography;

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  category_id: string; // Add the category field
};

type DetailPageProps = {
  products: Product[];
};

const DetailPage: React.FC<DetailPageProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const currentProduct = products.find((item) => item.id === Number(id));

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
    
      <Divider />
      <Title level={3}>Thông tin sản phẩm</Title>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <Image src={currentProduct?.image} alt={currentProduct?.name} width={200} />
        </div>
      </div>
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Tên sản phẩm">
          <Text strong>{currentProduct?.name}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Giá">
          <Text strong>{currentProduct?.price} Vnđ</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả">{currentProduct?.description}</Descriptions.Item>
        <Descriptions.Item label="ID danh mục">
          {currentProduct?.category_id}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Text type="secondary">Thông tin khác về sản phẩm</Text>
      </div>
      <ul style={{ paddingLeft: '24px', marginTop: '12px', border: '1px solid #ccc', borderRadius: '4px', padding: '12px' }}>
        <li>Thông tin 1</li>
        <li>Thông tin 2</li>
        <li>Thông tin 3</li>
      </ul>
    </div>
  );
};

export default DetailPage;
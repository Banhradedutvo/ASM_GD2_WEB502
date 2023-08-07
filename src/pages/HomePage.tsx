import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Select, Row, Col } from 'antd';
import { AppFooter, AppHeader, AppSlider } from './Components';
const { Option } = Select;

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  category_id: number;
};

type Category = {
  id: number;
  name: string;
};

type HomepageProps = {
  products: Product[];
  categories: Category[];
};

const Homepage: React.FC<HomepageProps> = ({ products, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [scale, setScale] = useState(1);

  const handleCategoryChange = (value: number | null) => {
    setSelectedCategory(value);
  };

  const handleScaleChange = (value: number) => {
    setScale(value);
  };

  let filteredProducts;

  if (selectedCategory) {
    filteredProducts = products.filter((product) => product.category_id === selectedCategory);
  } else {
    filteredProducts = products;
  }

  return (
    <div className='main'>
      <AppHeader />
      <AppSlider />
      <div className='content'>
        <div>
          <Button type="primary">
            <Link to="/admin">Admin</Link>
          </Button>

          <Select
            defaultValue={null}
            onChange={handleCategoryChange}
            style={{ width: 200, marginBottom: 16 }}
            placeholder="Select category"
          >
            <Option value={null}>All Categories</Option>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>

          <Select
            defaultValue={1}
            onChange={handleScaleChange}
            style={{ width: 200, marginBottom: 16 }}
            placeholder="Select scale"
          >
            <Option value={0.8}>Small</Option>
            <Option value={1}>Medium</Option>
            <Option value={1.2}>Large</Option>
          </Select>

          <Row gutter={[16, 16]}>
            {filteredProducts.map((item) => (
              <Col key={item.id}>
                <Card
                  hoverable
                  cover={<img src={item.image} alt={item.name} style={{ transform: `scale(${scale})` }} />}
                >
                  <Link to={`/detail/${item.id}`}>
                    <Card.Meta title={item.name} description={item.price} />
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

      </div>
      <AppFooter />
    </div>

  );
};

export default Homepage;
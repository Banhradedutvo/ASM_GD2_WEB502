import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {  Homepage, DetailPage, Dashboard, ProductPage, AddProduct, UpdateProductPage,CategoryList,
  AddCategoryPage,UpdateCategoryPage,RegisterForm,LoginForm,UserManagementPage} from './pages';
  import { useNavigate } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
function App() {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const removeProduct = (id) => {
    const result = confirm("Bạn có muốn xóa ko");
    if (result) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
      }).then(() => setProducts(products.filter((item) => item.id != id)))
    } else {
      return
    }

  }
  const addProduct = (product: any) => {
    const result = window.confirm('Bạn có muốn thêm sản phẩm không?');
    if (result) {
      fetch(`http://localhost:3000/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then(() => {
        setTimeout(() => {
          navigate('/admin/product')
        }, 1000);
      });
    } else {
      return;
    }
  };

  const onUpdate = (product: any) => {
    const result = window.confirm('Bạn có muốn cập nhật sản phẩm không?');
    if (result) {
      fetch(`http://localhost:3000/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then(() => alert('Đã cập nhật sản phẩm thành công'))
        .then(() => {
          setTimeout(() => {
            navigate('/admin/product');
          }, 1000);
        });
    } else {
      return;
    }
  };


  //categori
  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then((response) => response.json())
      .then((data) => setCategorys(data));
  }, []);
  const removeCategory = (id) => {
    const result = confirm("Bạn có muốn xóa ko");
    if (result) {
      fetch(`http://localhost:3000/categories/${id}`, {
        method: "DELETE"
      }).then(() => setCategorys(categorys.filter((item) => item.id != id)))
    } else {
      return
    }

  }
  const AddCategory = (category: any) => {
    const result = window.confirm('Bạn có muốn thêm sản phẩm không?');
    if (result) {
      fetch(`http://localhost:3000/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      }).then(() => {
        setTimeout(() => {
          navigate('/admin/category');
        }, 1000);
      });
    } else {
      return;
    }
  };
  const onUpdateCategory = (category: any) => {
    console.log(category);
    const confirmUpdate = async () => {
      try {
        const response = await fetch(`http://localhost:3000/categories/${category.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(category),
        });
  
        if (!response.ok) {
          throw new Error('Cập nhật danh mục không thành công');
        }
  
        alert('Đã cập nhật danh mục thành công');
        setTimeout(() => {
          navigate('/admin/category');
        }, 1000);
      } catch (error) {
        console.error(error);
        alert('Đã xảy ra lỗi khi cập nhật danh mục');
      }
    };
  
    const result = window.confirm('Bạn có muốn cập nhật danh mục không?');
    if (result) {
      confirmUpdate();
    }
  };

  const handleLoginSuccess = () => {
    setTimeout(()=>{
      navigate("/");
     
    },1000)
  
  };
  return (
    <>


    <Routes>
      <Route path="/">
        <Route index element={<Homepage products={products} categories={categorys} />} />
        <Route path="detail/:id" element={<DetailPage products={products} />} />
        <Route path="signup" element={< RegisterForm/>} />
        <Route path="login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
      </Route>
      <Route path="/admin">
        <Route index element={<Dashboard />} />
        <Route path="product">
          <Route index element={<ProductPage products={products} removeProduct={removeProduct} />} />
          <Route path="add" element={<AddProduct addProduct={addProduct} />} />
          <Route path="update/:id" element={<UpdateProductPage onUpdate={onUpdate} products={products} />} />
        </Route>
        <Route path="category">
          <Route index element={<CategoryList categories={categorys} removeCategory={removeCategory} />} />
          <Route path="add" element={<AddCategoryPage addCategory={AddCategory} />} /> 
          <Route path="update/:id" element={<UpdateCategoryPage onUpdate={onUpdateCategory} categories={categorys} />} />
        </Route>
        <Route path='user' element={<UserManagementPage/>}/>
      </Route>
    </Routes>
  </>


  );
}

export default App;
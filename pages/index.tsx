import React, { useState } from 'react';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';

interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
}

const AppContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: 'Acer Predator', price: 1500, stock: 10 },
    { id: 2, title: 'HP Pavilion', price: 1000, stock: 5 },
  ]);

  const [sortField, setSortField] = useState<string>('');

  const handleSort = (field: string) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });

    if (field === sortField) {
      setProducts(sortedProducts.reverse());
    } else {
      setProducts(sortedProducts);
      setSortField(field);
    }
  };

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleDecrease = (id: number) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id && product.stock > 0) {
        return { ...product, stock: product.stock - 1 };
      } else {
        return product;
      }
    });
    setProducts(updatedProducts);
  };

  const handleFormSubmit = (title: string, price: number, stock: number) => {
    const existingProduct = products.find((product) => product.title === title);
    if (existingProduct) {
      const confirmed = confirm('Данный продукт уже существует, вы хотите его заменить?');
      if (confirmed) {
        const updatedProducts = products.map((product) => {
          if (product.title === title) {
            return { ...product, price: price, stock: product.stock + stock };
          } else {
            return product;
          }
        });
        setProducts(updatedProducts);
      } else {
        const newProductId = products.length + 1;
        setProducts([...products, { id: newProductId, title: `${title}-${newProductId}`, price, stock }]);
      }
    } else {
      const newProductId = products.length + 1;
      setProducts([...products, { id: newProductId, title, price, stock }]);
    }
  };

  return (
    <div>
      <h1>Product Catalog</h1>
      <ProductTable products={products} onSort={handleSort} onDelete={handleDelete} onDecrease={handleDecrease} />
      <ProductForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AppContainer;
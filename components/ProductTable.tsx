import React, { useState } from 'react';
import ProductRow from './ProductRow';

interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
}

interface ProductTableProps {
  products: Product[];
  onSort: (field: string) => void;
  onDelete: (id: number) => void;
  onDecrease: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onSort, onDelete, onDecrease }) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>(''); 

  const handleSort = (field: string) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortDirection === 'asc') {
      direction = 'desc';
    }

    setSortDirection(direction);
    onSort(field);
  };

  const renderArrow = (field: string) => {
    if (sortDirection === 'asc') {
      return field === 'title' ? '↑' : '→';
    } else if (sortDirection === 'desc') {
      return field === 'title' ? '↓' : '←';
    } else {
      return '';
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('title')}>
            Title {renderArrow('title')}
          </th>
          <th onClick={() => handleSort('price')}>
            Price $ {renderArrow('price')}
          </th>
          <th onClick={() => handleSort('stock')}>
            Stock {renderArrow('stock')}
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onDelete={() => onDelete(product.id)}
            onDecrease={() => onDecrease(product.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
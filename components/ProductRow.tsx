import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
}

interface ProductRowProps {
  product: Product;
  onDelete: () => void;
  onDecrease: (id: number) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onDelete, onDecrease }) => {
  return (
    <tr>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>
        {product.stock > 0 ? (
          <>
            {product.stock}
            <button onClick={() => onDecrease(product.id)}>Decrease</button>
          </>
        ) : (
          'Not available'
        )}
      </td>
      <td>{product.stock === 0 && <button onClick={onDelete}>Delete</button>}</td>
    </tr>
  );
};

export default ProductRow;
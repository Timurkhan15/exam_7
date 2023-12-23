import React, { useState } from 'react';

interface ProductFormProps {
  onSubmit: (title: string, price: number, stock: number) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, price, stock);
    setTitle('');
    setPrice(0);
    setStock(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Price $:
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </label>
      <label>
        Stock:
        <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
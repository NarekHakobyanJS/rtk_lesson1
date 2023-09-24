import { useState } from 'react';
import './App.css';
import { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } from './store/goodsApi';

function App() {
 const [count, setCount] = useState('')
 const [newPorduct, setNewProduct] = useState("")
 const [addProduct, {isError}] = useAddProductMutation()
 const { data = [], error, isLoading} = useGetGoodsQuery(count)
 const [deleteProduct, {}] = useDeleteProductMutation()
 
 const handleAddProduct = async () => {
  if(newPorduct) {
    await addProduct({name : newPorduct}).unwrap()
    setNewProduct("")
  }
 }

 const handleDeleteProduct = async (id) => {
  await deleteProduct(id).unwrap()
 }
 if(isLoading) return <h1>Loading...</h1>
 
 return (

    <div className="App">
      <input value={newPorduct}
      onChange={e => setNewProduct(e.target.value)}
      />
      <button onClick={handleAddProduct}>add</button>
      <div>
        <select value={count} onChange={e => setCount(e.target.value)}>
          <option value=''>all</option>
          <option value='1'>1</option>
        </select>
      </div>
      {
        data.map((el) => {
          return <>
          <li>{el.name}</li>
          <button onClick={() =>  handleDeleteProduct(el.id)}>x</button>
          </> 
        })
      }
    </div>
  );
}

export default App;

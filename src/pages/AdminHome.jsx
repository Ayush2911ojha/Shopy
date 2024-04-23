import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/components/ProductList'
import AdminProductList from '../features/product-list copy/components/AdminProductList'

const AdminHome = () => {
  return (
    <div>
        <Navbar>
            <AdminProductList/>
        </Navbar>
    </div>
  )
}

export default AdminHome
import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetails from '../features/product-list/components/ProductDetails'
import AdminProductDetails from '../features/product-list copy/components/AdminProductDetails'

const AdminProductDetailsPage = () => {
  return (
    <div>
        <Navbar>
            <AdminProductDetails/>
        </Navbar>
    </div>
  )
}

export default AdminProductDetailsPage
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchAllProductsFilter,fetchBrands,fetchCategories, fetchProductById } from './ProductListAPI';

const initialState = {
  products:[],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product-list/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllProductByIdAsync = createAsyncThunk(
  'product-list/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllProductsFilterAsync =createAsyncThunk(
   'product-list/fetchAllProductsFilter',
    async({filter,sort,pagination})=>{
        const response =await fetchAllProductsFilter(filter,sort,pagination);
        return response.data;
    }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product-list/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product-list/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export  const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductsFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })

  },
});

export const { increment} = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems= (state) => state.product.totalItems;
export default productSlice.reducer;

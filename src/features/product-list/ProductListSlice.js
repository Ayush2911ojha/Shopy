import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchAllProducts,fetchAllProductsFilter,fetchBrands,fetchCategories, fetchProductById, updateProduct } from './ProductListAPI';

const initialState = {
  products:[],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
};



export const fetchProductByIdAsync = createAsyncThunk(
  'product-list/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllProductsFilterAsync =createAsyncThunk(
   'product-list/fetchAllProductsFilter',
    async({filter,sort,pagination,admin})=>{
        const response =await fetchAllProductsFilter(filter,sort,pagination,admin);
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

export const createProductAsync = createAsyncThunk(
  'product-list/create',
  async (product) => {
    const response = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'product-list/update',
  async (update) => {
    const response = await updateProduct(update);
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
     clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      
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
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
     .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(createProductAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.products.push(action.payload);
      // })
      .addCase(createProductAsync.fulfilled, (state, action) => {
     state.status = 'idle';
     state.products = [...state.products, action.payload];
})

     .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(updateProductAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   const index =  Object.values(state.products).findIndex(
      //     (product) => product.id === action.payload.id
      //   );
      //   state.products[index] = action.payload;
      //   state.selectedProduct = action.payload;

    // });
    .addCase(updateProductAsync.fulfilled, (state, action) => {
  state.status = 'idle';
  
  // Convert state.products object into an array
  const productsArray = Object.values(state.products);
  
  // Find the index of the product to update in the array
  const index = productsArray.findIndex(product => product.id === action.payload.id);
  
  // If the product is found, update it in the array
  if (index !== -1) {
    productsArray[index] = action.payload;
    state.products = { ...productsArray }; // Convert back to an object if needed
    state.selectedProduct = action.payload;
  }
});


  },
});

export const { clearSelectedProduct} = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems= (state) => state.product.totalItems;
export default productSlice.reducer;

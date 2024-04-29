// A mock function to mimic making an async request for data

export function createOrder(order) {
  return new Promise(async (resolve) =>{
      const response=await fetch('http://localhost:8080/orders',{
        method:'POST',
        body:JSON.stringify(order),
        headers:{'content-type':'application/json'}
      })
      const data =await response.json();
      resolve({data});
  }
  );
}
export function updateOrder(order) {
  return new Promise(async (resolve) =>{
      const response=await fetch('http://localhost:8080/orders/'+order.id,{
        method:'PATCH',
        body:JSON.stringify(order),
        headers:{'content-type':'application/json'}
      })
      const data =await response.json();
      resolve({data});
  }
  );
}
export function fetchAllOrders( pagination ) {
  let queryString = '';
 
  for (let key in pagination) {
  
    queryString+=`${key}=${pagination[key]}&`
  }
    console.log("queeryString sahi wali ", queryString)
  
  return new Promise(async (resolve) =>{
      const response=await fetch('http://localhost:8080/orders?'+queryString)
      const data =await response.json();
    // console.log("page data", data)
    // const totalOrders = await response.headers.get('X-Total-Count'); why not ?
    const totalOrders = data.length
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

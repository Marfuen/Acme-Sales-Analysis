const products = [
  {
    id: 1,
    name: 'foo',
    price: 7
  },
  {
    id: 2,
    name: 'bar',
    price: 2
  },
  {
    id: 5,
    name: 'bazz',
    price: 1
  },
];

const users = [
  {
     id: 1,
     name: 'moe'
  },
  {
     id: 2,
     name: 'larry'
  },
  {
     id: 3,
     name: 'curly'
  }
];

// productId matches up with product in products
// userId matches up with user in users
const orders = [
  {
    id: 1,
    productId: 1,
    quantity: 3,
    userId: 1
  },
  {
    id: 2,
    productId: 1,
    quantity: 7,
    userId: 1
  },
  {
    id: 3,
    productId: 5,
    quantity: 70,
    userId: 3
  },
  {
    id: 4,
    productId: 5,
    quantity: 1,
    userId: 3
  }
];


const productsPurchased = (orders, products) => {
  let finalList = [];
  let idsToFind =  orders.reduce((acc, order) => {
    let curProdId = order.productId;
    if(!acc.includes(curProdId)){
      acc.push(curProdId)
    }
    return acc
  }, []);

  products.forEach(product => {
    let curProdId = product.id;
    if(idsToFind.includes(curProdId)){
      finalList.push(product.name);
    }
  });
  return finalList
}


const topSellingProductByQuantity = (orders, products) => {
  let finalArr = [];
  orders.forEach(elem => {
    if(finalArr.length < 1){
      finalArr.push({productId: elem.productId, quantity: elem.quantity});
    }
    else {
      finalArr.forEach(accElem => {
        if(elem.productId === accElem.productId){
          accElem.quantity += elem.quantity;
        } 
        if(elem.productId !== accElem.productId){
          finalArr.push({productId: elem.productId, quantity: elem.quantity})
        }
      });
    }
  });

  let currentMax = 0;
  let currentProdId = 0;
  finalArr.forEach(elem => {
    if(elem.quantity > currentMax){
      currentMax = elem.quantity;
      currentProdId = elem.productId
    }
  })
  
  let result = ""
  products.forEach(elem => {
    if(elem.id === currentProdId){
      result = elem.name;
    }
  });
  return result;
}

const usersWithOrders = (users, orders) => {
  let usersList = [];
  orders.forEach(order => {
    if(!usersList.includes(order.userId)){
      usersList.push(order.userId);
    }
  });

  let usersNames = [];
  users.forEach(user => {
    if(usersList.includes(user.id)){
      usersNames.push(user.name);
    }
  });
  
  return usersNames
}

console.log(productsPurchased(orders, products)); // logs foo and bazz products

console.log(topSellingProductByQuantity(orders, products));//logs bazz product

console.log(usersWithOrders(users, orders));//logs info on moe and curly
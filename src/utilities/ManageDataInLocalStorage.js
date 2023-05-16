

const setData = (newProduct) => {
    let allProducts = getData();
    const isExists = allProducts.find(pd => pd._id === newProduct._id);
    if(isExists){
        allProducts.forEach(pd => {
            if(pd._id === newProduct._id) {
                pd.quantity++;
            }
        })
    }
    else {
        newProduct.quantity = 1;
        allProducts = [...allProducts, newProduct];
    }
    localStorage.setItem('Ordered-Products', JSON.stringify(allProducts));
}


const getData = () => {
    let allData = [];
    const storedData = localStorage.getItem('Ordered-Products');
    if(storedData) {
        allData = JSON.parse(storedData);
    }
    return allData;
}

export { setData, getData };


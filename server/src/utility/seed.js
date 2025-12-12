const product=require("../model/product.model");

const seed=async()=>{
    try {
        await product.deleteMany({});
        const data=await product.insertMany([
            {name:"product1",price:100},
            {name:"product2",price:200},
            {name:"product3",price:300},
            {name:"product4",price:400},
            {name:"product5",price:500},
            {name:"product6",price:600},
            {name:"product7",price:700},]);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports=seed;
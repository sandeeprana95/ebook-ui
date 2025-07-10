const discount=(price,discount)=>{
   const data =  price-(price*discount/100)
   return Math.floor(data)
}

export default discount
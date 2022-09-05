


const getReceipentEmail = ( users, userLoggedIn)=>{
   return  users?.filter(userToFilter=> userToFilter !== userLoggedIn.email)[0]
}


export default getReceipentEmail
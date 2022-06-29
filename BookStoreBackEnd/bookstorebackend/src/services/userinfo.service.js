import Userinfo from '../models/userinfo.model';

export const customerDetails=async(UserID,body)=>{

  console.log("2") 
  const userDetails = await Userinfo.findOne({UserID:UserID})
  console.log(userDetails)
  if(userDetails){
    throw new Error("user information already exists");
  }
  else{  
  const data = await Userinfo.create(body);
  console.log("2") 
  console.log(data)
  return data;
  }
}
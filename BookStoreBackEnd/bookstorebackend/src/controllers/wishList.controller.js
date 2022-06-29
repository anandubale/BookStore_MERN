import HttpStatus from 'http-status-codes';
import * as wishListService from '../services/wishList.service'

export const checkWishList = async(req,res) =>{
    try {
        console.log(req.params._id)
        const dataById = await wishListService.checkWishList(req.body.UserID);
        res.status(HttpStatus.OK).json({
          code:HttpStatus.OK,
          data: dataById,
          message: "WishList is present"
          })
      } catch (error) {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message : `${error}`
        })  
      }
}

export const addToWishList = async(req,res)=>{
    try {
      console.log(req.params._id)
      const dataById = await wishListService.addToWishList(req.params._id, req.body.UserID);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: dataById,
        message: "Successfully added book to wishList"
        })
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message : `${error}`
      })  
    }
  };
  


  export const removeBookFromWishList = async(req,res)=>{
    try {
      console.log(req.params._id)
      const dataById = await wishListService.removeBookFromWishList(req.params._id, req.body.UserID);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: dataById,
        message: "Successfully removed from cart"
        })
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message : `${error}`
      })  
    }
};




export const increaseQuantityInCart = async(req,res)=>{
  try {
    console.log(req.params._id)
    const dataById = await cartService.increaseQuantityInCart(req.params._id, req.body.UserID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: dataById,
      message: "Quatity is Increased"
      })
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message : `${error}`
    })  
  }
};







  
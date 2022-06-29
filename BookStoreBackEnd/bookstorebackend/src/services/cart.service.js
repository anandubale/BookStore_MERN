import { Console } from 'winston/lib/winston/transports'
import Book from '../models/book.model'
import cartModel from '../models/cart.model'



export const checkCart = async(UserID) => {
    const CheckCart = await cartModel.findOne({UserID})
    if(CheckCart != null){
        console.log("total", CheckCart.cart_total)
        return CheckCart
    }
    else{
        throw new Error("This user dont have cart")
    }

}



export const addToCart = async(_id,UserID)=>{

    
    const ExistingBook = await Book.findById({_id,UserID})
    console.log(ExistingBook)
    if(ExistingBook != null)
    {
        const CheckCart = await cartModel.findOne({UserID})
        console.log(CheckCart)
        const newBook = {
            productId: _id,
            bookName: ExistingBook.bookName,
            author:ExistingBook.author,
            price:ExistingBook.price,
            quantity: 1
        }
        console.log("newBook",newBook)
        // console.log("this is check cart total",CheckCart.cart_total)
        if(CheckCart){
            console.log("CheckCart")
            CheckCart.book.push(newBook)
            const UpdateCheckCart = await cartModel.findOneAndUpdate({UserID},
                { 
                    $set:{ book: CheckCart.book,
                    cart_total: ExistingBook.price * newBook.quantity + CheckCart.cart_total
                    }
                },
                {new: true}
                )
            console.log("added to: ",UpdateCheckCart)
            return UpdateCheckCart
        }
        else
        {

            const newCart = {
                UserID: UserID,
                book: [newBook],
                cart_total: ExistingBook.price ,
                isPurchased : false
            }
            const CreateCart = cartModel.create(newCart)
            const UpdateCart = checkCart(UserID)
            return UpdateCart;
        } 
    }
    else{
         throw new Error('Selected book is not present')
    }
}

export const removeBookFromCart = async  (_id,UserID)=>{
    
        const CheckCart = await cartModel.findOne({UserID})
        console.log("this is to check cart",CheckCart)
        if(CheckCart){
            console.log("this is cart",CheckCart.book)
            const findIndex = CheckCart.book.findIndex(a => a._id === CheckCart.book.productId)
            console.log("index of book ",findIndex)
            CheckCart.book.splice(findIndex , 1)
            let TotalPrice = 0
            for(var i=0; i<CheckCart.book.length; i++){
                console.log(i)
               TotalPrice =  CheckCart.book[i].price + TotalPrice
            }
            console.log("TotalPrice",TotalPrice)
            const UpdateCheckCart = await cartModel.findOneAndUpdate({UserID},
                {
                $set:{ book: CheckCart.book},
                // cart_total:  CheckCart.cart_total - CheckCart.book[findIndex].price * CheckCart.book[findIndex].quantity 
                cart_total: TotalPrice
                },
                {new: true}
            )
            return UpdateCheckCart
        }
}


export const increaseQuantityInCart = async (_id,body)=>{
     
    const  usercart = await cartModel.findOne({UserID: body.UserID})
    console.log("this is usecart",usercart)
    if(usercart){
        
       const findIndex = usercart.book.findIndex(book=>book.productId === _id)
       if(body.increase === true){
        console.log("quantity",usercart.book[findIndex].quantity)
        usercart.book[findIndex].quantity += 1
        console.log("quantity",usercart.book[findIndex].quantity)
       }
       else{
        usercart.book[findIndex].quantity -= 1
        console.log(usercart.book[findIndex].quantity)
       }

       if(usercart.book[findIndex].quantity === 0){
        console.log("we need to remove this book from cart")
        usercart.book.splice(findIndex , 1)

        let TotalPrice = 0
 
        const UpdateCheckCart = await cartModel.findOneAndUpdate({UserID: body.UserID},
         {
            $set:{ book: usercart.book},
            cart_total: TotalPrice
         },
         {new: true}
         )
         return UpdateCheckCart
    }
    else{

        let TotalPrice = 0
        for(var i=0; i<usercart.book.length; i++){
            console.log(i)
           TotalPrice =  usercart.book[i].price * usercart.book[i].quantity + TotalPrice
        }
 
        const UpdateCheckCart = await cartModel.findOneAndUpdate({UserID: body.UserID},
         {
            $set:{ book: usercart.book},
            cart_total: TotalPrice
         },
         {new: true}
         )
         return UpdateCheckCart
    }
    }
    
}


export const purchased = async (_id,UserID)=>{

    const UpdateCheckCart = await cartModel.findOneAndUpdate({UserID},
        {
            $set:{ isPurchased: true},
            cart_total: TotalPrice

        },
        {new: true}
    )
    return UpdateCheckCart
}



//https://www.youtube.com/watch?v=mf4MYMS-75Q&list=PLM0LBHjz37LW_Wz3DPoT5-bm1btrBD1bu
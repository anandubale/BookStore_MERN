import WishListModel from '../models/wishlist.model'
import Book from '../models/book.model'



export const checkWishList = async(UserID) => {
    const checkWishList = await WishListModel.findOne({UserID})
    if(checkWishList != null){
        return checkWishList
    }
    else{
        throw new Error("This user dont have WishList")
    }

}

export const addToWishList = async(_id,UserID)=>{

   
    const ExistingBook = await Book.findById({_id,UserID})
    if(ExistingBook != null)
    {
        const CheckWishList = await WishListModel.findOne({UserID})
        const newBook = {
            productId: _id,
            bookImage: ExistingBook.bookImage,
            bookName: ExistingBook.bookName,
            author:ExistingBook.author,
            price:ExistingBook.price,
        }
        console.log("this is to check wishlist",CheckWishList)
        if(CheckWishList){
            CheckWishList.book.push(newBook)
            const UpdateCheckWishList = await WishListModel.findOneAndUpdate({UserID},
                { 
                $set:{ book: CheckWishList.book},
                },
                {new: true}
                )
            return UpdateCheckWishList
        }
        else{

            console.log("we are creation of wishlist")
            const newWishList = {
                UserID: UserID,
                book: [newBook],
            }
            const CreateWishList = await WishListModel.create(newWishList)
            const UpdateCart = checkWishList(UserID)
            return UpdateCart;
        } 
    }
    else{
         throw new Error('Selected book is not present')
    }
}

export const removeBookFromWishList = async  (_id,UserID)=>{
    const ExistingBook = Book.findById({_id})
    if(ExistingBook){
        const CheckWishList = await WishListModel.findOne({UserID})
        console.log("this is to check wishlist",CheckWishList)
        if(CheckWishList){
            console.log("this is wishlist",CheckWishList.book)
            const findIndex = CheckWishList.book.findIndex(a => a._id === CheckWishList.book.productId)
            console.log("index of book ",findIndex)
            CheckWishList.book.splice(findIndex , 1)
            console.log("this is updatedwishlist",CheckWishList.book)
            const UpdateCheckWishList = await WishListModel.findOneAndUpdate({UserID},
                {
                $set:{ book: CheckWishList.book},
                },
                {new: true}
                )
            return UpdateCheckWishList
        }
    }else
    {
        throw new Error("book is not present to remove")
    }
}

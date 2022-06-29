import { Schema, model } from 'mongoose';

const wishListSchema = new Schema(
  {
    UserID: {
        type: String
      },
      book: [{
        productId: {
          type: String
        },
        bookImage: {
            type: String
        },
        bookName: {
          type: String
        },
        author: {
          type: String
        },
        quantity: {
          type: Number
        },
        price: {
          type: Number
        }
      }],
  },
  {
    timestamps: true
  }
);

export default model('wishList', wishListSchema);

import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";


const blogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
},{
    timestamps: true,
    versionKey: false,
  })




export const BlogModel = model<TBlog>("Blog", blogSchema);

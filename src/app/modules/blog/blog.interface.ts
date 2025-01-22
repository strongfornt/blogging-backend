import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface TBlog {
    title: string;
    content: string;
    isPublished: boolean;
    author: Types.ObjectId
}


export interface IBlogUpdate {
    body: {
      title: string;
      content: string;
    };
    blogId: string;
    user: JwtPayload
  }

export interface IDeleteBlog extends Omit<IBlogUpdate, 'body'>{}  
  
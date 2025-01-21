import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface TBlog {
    title: string;
    content: string;
    author: Types.ObjectId
    isPublished: boolean;
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
  
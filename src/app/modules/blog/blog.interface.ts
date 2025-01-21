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
    user: {
      userId: string;
      role: "user" | "admin"; 
      iat: number; 
      exp: number; 
    };
  }
  
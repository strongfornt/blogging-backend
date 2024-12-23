import catchAsync from "../../utils/catch-async"
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service"

const createBlog = catchAsync(async(req, res, next) => {
    const {body} = req.body;
    const user = req?.user
    const payload = {
        ...body,
        author: user?.userId
    }
    console.log(payload);
    
    
    const result = await BlogServices.createBlogIntoDB(payload);
    sendResponse(res, {
        success: true,
        message: "Blog created successfully",
        statusCode: 201,
        data: result,
      });
})


export const BlogController = {
    createBlog
}
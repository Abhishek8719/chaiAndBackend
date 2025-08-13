// const asyncHandler =(fn)=> async(req,res,next)=>{

//     try {
//          await fn(req,res,next)

//     } catch (error) {
//         res.status(error.code).json({
//             message:error.message,
//             success:false
//         })
//     }

// }

const asyncHandler = (requestHandler) =>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}

export default asyncHandler


const asyncHandler = (requestHandler) => {
  return (req,res,next) => {
    Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
  }
}


export {asyncHandler}


/*const asyncHa = (fn) => async(req,res,next) => {
  try {
    await fn(req,res,next)
  } catch (err) {
    res.status(200 || err.statusCode).json({
      success: false,
      message: err.message
    })
  }
}*/
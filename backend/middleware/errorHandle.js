const errorHandler = (err,req,res,next)=>{
    let statusCode = 500;
    let errorMessages = err.message;
    console.log("Global Handler runs");
    if(err.name === 'validationError'){
       console.log(err.error);
       const messages = Object.values(err.errors).map(val=>val.message);
       statusCode = 400;
       errorMessages = messages;
    }
    else{
        console.log(err.message);
    }


    res.status(statusCode).json({
        message:errorMessages
    });
    
}

module.exports = errorHandler

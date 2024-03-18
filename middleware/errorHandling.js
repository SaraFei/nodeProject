export const errorHandling = (err, req, res, next) => {
//בעיה!!!!
    if (!res==null){
    let statusCode = res.statusCode || 500;
    let message = err.message || 'מצטערים התרחשה שגיאה בשרת';
    res.status(statusCode).send(message);}
}
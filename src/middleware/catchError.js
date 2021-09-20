
module.exports = function catchError(options) {

    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            console.log(e);
        }
    }; 
}
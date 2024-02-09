

export class HandleError  extends Error{
    constructor( message: any){
        super(message)
        //this.statusCode = statusCode;
    }
};
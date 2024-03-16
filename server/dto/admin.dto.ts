

export interface IAdminInput {
    name: string,
    email:string,
    number: number,
    address: string,
    pin: string,
    password: string
};


export interface Api<Q,R,T,Y,U,I,O,P>{
    name:T,
    accountnumber: R,
    unkwown1?:P
}

export type IObject = {}

const obj: IObject = {name: "Yusuf", accNum:"01223456", address:{city:"Jos", state: "Plateau"}}
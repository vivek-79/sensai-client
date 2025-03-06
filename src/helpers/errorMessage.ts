



export const errorMessage=(error:any):string=>{

    return error?.response?.data?.message
}
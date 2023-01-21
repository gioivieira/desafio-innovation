import axios from "axios"
import { Request, Response } from "express"

const getCounties = async (req: Request, res: Response)=>{
    let errorCode = 400
    let BASE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios"

    try{
        axios.get(BASE_URL)
        .then((response)=> {
            res.status(200).send(response.data)
        })
        .catch((err)=> console.log(err.message))
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default getCounties;
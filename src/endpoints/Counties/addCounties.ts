import axios from 'axios'
import { Request, Response } from 'express'
import BaseDatabase from '../../class/BaseDatabase'

const addCounties = async (req: Request, res: Response)=>{
    let errorCode = 400
    let id
    let countieName
    let newCountie
    let BASE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios"

    try{
        axios.get(BASE_URL)
        .then( async (response)=> {
            
            for(let countie of response.data){
                id = countie.id
                countieName = countie.nome

                newCountie = {
                    id,
                    countie_name: countieName
                }

                const allCounties = await BaseDatabase.connection("Counties").select("*")

                for(let countieTable of allCounties){
                    if(countieTable.countie_name === countie.nome){
                        res.status(422).send("Counties already added to the table.")                       
                    }
                }

                await BaseDatabase.connection("Counties").insert(newCountie)
                }

            res.status(201).end()
        })
        .catch((err)=> console.log(err.message))
                
    }catch(err: any){
        res.status(errorCode).send(err.message)
    }
}

export default addCounties
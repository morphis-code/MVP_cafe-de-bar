"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Login(){

    const [erro, setErro] = useState("")
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    const router = useRouter()

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    async function handleSubmit(e){

        e.preventDefault()

        setErro("")

        try{
            const response = await fetch("http://localhost:3333/api/login", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData),
                credentials:"include"
            })
    
            if(!response.ok){
                setErro("*Seu email ou senha estão incorretos")
                console.log("Erro ao fazer login")
                return
            }

            const data = await response.json()

            //Redirecionamento
            router.push("/promos")

        }catch(error){
            console.error("Erro ao fazer login", error)
            
        }
      


    } 


    return(
        <form className="w-full max-w-[400px]" onSubmit={handleSubmit}>
            <Card className="w-full border-0 shadow-none lg:border-1 lg:shadow ">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Um login comum com um estilo comum...</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2 mb-5">
                    <Label>Email</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2 mb-7">
                    <Label>Password</Label>
                    <Input name="password" type="password" value={formData.password} onChange={handleChange}/>
                </div>
                <Button className="w-full cursor-pointer" type="submit">Enviar</Button>
                <div className="mt-7">
                    <p className="text-red-500">{erro}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Link href="/register">Cadastra-se</Link>
            </CardFooter>
            </Card>            
        </form>
    )
}
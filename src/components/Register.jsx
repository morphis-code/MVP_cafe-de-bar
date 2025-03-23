"use client"

import { useState } from "react"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"


const sex = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "others",
      label: "Others",
    }
  ]


  const category = [
    {
      value: "consumer",
      label: "Consumer",
    },
    {
      value: "establishment",
      label: "Establishment",
    },
  ]




export default function Register(){

    const [open, setOpen] = useState(false) // sex
    const [open2, setOpen2] = useState(false) // category
    const [value, setValue] = useState("") // sex
    const [value2, setValue2] = useState("") // category
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        name:"",
        email:"",
    })
    

    const router = useRouter()

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        setError("")

        if(password != confirmPassword){
            setError("Senhas não compatíveis")
            return
        }

        try{
            const response = await fetch("http://localhost:3333/api/register", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({...formData, sex:value, role:value2,password:password}),
                credentials:"include"
            })

            if(!response.ok){
                console.log("Erro ao registrar")
            }

            router.push("/promos")

        }catch(error){
            console.error("Erro ao registrar usuário", error)
            return
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
                    <Label>Name</Label>
                    <Input name="name" type="text" value={formData.name} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                    <Label>Email</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                    <Label>Sex</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                        >
                        {value
                            ? sex.find((sex) => sex.value === value)?.label
                            : "Select Sex"}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                        <CommandInput placeholder="Search Sex..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No sex found.</CommandEmpty>
                            <CommandGroup>
                            {sex.map((sex) => (
                                <CommandItem
                                key={sex.value}
                                value={sex.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                                >
                                {sex.label}
                                <Check
                                    className={cn(
                                    "ml-auto",
                                    value === sex.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                    </Popover>                
                </div>

                <div className="flex flex-col gap-2 mb-5">
                    <Label>Category</Label>
                    <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open2}
                        className="w-[200px] justify-between"
                        >
                        {value2
                            ? category.find((category) => category.value === value2)?.label
                            : "Select Category"}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                        <CommandInput placeholder="Search Category..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No sex found.</CommandEmpty>
                            <CommandGroup>
                            {category.map((category) => (
                                <CommandItem
                                key={category.value}
                                value={category.value}
                                onSelect={(currentValue) => {
                                    setValue2(currentValue === value2 ? "" : currentValue)
                                    setOpen2(false)
                                }}
                                >
                                {category.label}
                                <Check
                                    className={cn(
                                    "ml-auto",
                                    value2 === category.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                </CommandItem>
                            ))}
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </PopoverContent>
                    </Popover>                
                </div>

                <div className="flex flex-col gap-2 mb-7">
                    <Label>Password</Label>
                    <Input type="password" value={password} onChange={value => setPassword(value.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 mb-7">
                    <Label>Confirm Password</Label>
                    <Input type="password" value={confirmPassword} onChange={value => setConfirmPassword(value.target.value)}/>
                </div>
                <Button className="w-full cursor-pointer" type="submit">Enviar</Button>
            </CardContent>
            <div>
                {error}
            </div>
            </Card>            
        </form>
    )
}
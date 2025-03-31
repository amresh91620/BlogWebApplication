import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card } from '@/components/ui/card'
import { RouteSignIn, RouteSignUp } from '@/helpers/RouteName'
import { Link } from 'react-router-dom'

const SignIn = () => {

    const formSchema = z.object({
        email: z.string().email().nonempty("Email is required"),
        password: z.string().min(8, "Password must be at least  characters").nonempty("Password is required"),
         
      })
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
      })
      function onSubmit(values)  {
        
        console.log(values)
      }
    
  return (
    <div className='flex justify-center items-center h-screen w-screen' >
        <Card className='w-[380px]  p-5'>
        <h1 className='text-2xl font-bold text-center'>Sign Into account</h1>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='md-3'>
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className='md-3'>
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className='mt-5'> 
        <Button type="submit" className="w-full">Sing In</Button>
        <div className='mt-5 text-sm gap-2 text-center'>
            <p>Don&apos;t have account?</p>
            <Link className='text-blue-500 hover:underline ' to={RouteSignUp}>Sing Up</Link>
        </div>
        </div>
       
      </form>
    </Form>
        </Card>

    </div>
  )
}

export default SignIn

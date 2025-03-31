import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card } from '@/components/ui/card'
import { RouteSignIn} from '@/helpers/RouteName'
import { Link } from 'react-router-dom'

const SignUp = () => {
     const formSchema = z.object({
            Name: z.string().min(3, "Name must be at least 3 characters").nonempty("Name is required"),
            email: z.string().email().nonempty("Email is required"),
            password: z.string().min(8, "Password must be at least  characters").nonempty("Password is required"),
            confirmPassword: z.string().refine((val, ctx) => {
                if (val !== ctx.parent.password) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Passwords do not match",
                    })
                }
                return true
            }, {
                message: "Passwords do not match",
            }),
             
          })
          const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                Name: '',
                email: "",
                password: "",
                confirmPassword: "",
            },
          })
          function onSubmit(values)  {
            
            console.log(values)
          }

  return (
    <div className='flex justify-center items-center h-screen w-screen' >
    <Card className='w-[380px]  p-5'>
    <h1 className='text-2xl font-bold text-center'>Create your account</h1>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
  <div className='md-3'>
        <FormField
        control={form.control}
        name="Name"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input placeholder="Enter your name" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
    </div>
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
    <div className='md-3'>
        <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
                <Input placeholder="Confirm your password" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
    </div>
    <div className='mt-5'> 
    <Button type="submit" className="w-full">Sing Up</Button>
    <div className='mt-5 text-sm gap-2 text-center'>
        <p>Already have account?</p>
        <Link className='text-blue-500 hover:underline ' to={RouteSignIn}>Sing In</Link>
    </div>
    </div>
   
  </form>
</Form>
    </Card>

</div>
  )
}

export default SignUp

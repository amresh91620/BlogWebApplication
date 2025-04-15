import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card } from '@/components/ui/card'
import { RouteSignUp } from '@/helpers/RouteName'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values) {
    setError('');
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      const data = await response.json()

      if (response.ok) {
        console.log('✅ Login successful', data)
        // ✅ Store user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
        // Optionally save token: localStorage.setItem("token", data.token)
        navigate('/') // replace with your actual dashboard route
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Card className='w-[380px] p-5'>
        <h1 className='text-2xl font-bold text-center'>Sign Into Account</h1>

        {error && <p className="text-red-500 text-sm text-center my-2">{error}</p>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='md-3'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your email address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='md-3'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Enter your password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-5'>
              <Button type='submit' className='w-full'>
                Sign In
              </Button>
              <div className='mt-5 text-sm gap-2 text-center'>
                <p>Don&apos;t have account?</p>
                <Link className='text-blue-500 hover:underline' to={RouteSignUp}>
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default SignIn

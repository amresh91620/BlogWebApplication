import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { RouteSignIn } from '@/helpers/RouteName';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form'; // Import FormProvider

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // to redirect user to the login page after signup

  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const form = useForm({
    defaultValues: formData,
  });

  // Handle change in input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manual validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.Name || formData.Name.length < 3) {
      newErrors.Name = 'Name must be at least 3 characters long';
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  // Handle form submission
  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: formData.Name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success alert
        alert('✅ Registration successful!');
        // Redirect user to login page
        navigate(RouteSignIn);
      } else {
        // Handle error (e.g., email already exists)
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      alert('Something went wrong, please try again.');
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Card className='w-[380px] p-5'>
        <h1 className='text-2xl font-bold text-center'>Create your account</h1>
        
        {/* Wrap the form inside FormProvider */}
        <FormProvider {...form}> 
          <form onSubmit={onSubmit}>
            <div className='md-3'>
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your name'
                    name='Name'
                    value={formData.Name}
                    onChange={handleChange}
                  />
                </FormControl>
                {errors.Name && <FormMessage>{errors.Name}</FormMessage>}
              </FormItem>
            </div>
            <div className='md-3'>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your email address'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                {errors.email && <FormMessage>{errors.email}</FormMessage>}
              </FormItem>
            </div>
            <div className='md-3'>
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your password'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormControl>
                {errors.password && <FormMessage>{errors.password}</FormMessage>}
              </FormItem>
            </div>
            <div className='md-3'>
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Confirm your password'
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </FormControl>
                {errors.confirmPassword && <FormMessage>{errors.confirmPassword}</FormMessage>}
              </FormItem>
            </div>
            <div className='mt-5'>
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
              <div className='mt-5 text-sm gap-2 text-center'>
                <p>Already have an account?</p>
                <Link className='text-blue-500 hover:underline' to={RouteSignIn}>
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default SignUp;

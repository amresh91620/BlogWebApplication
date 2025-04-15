import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaCamera } from "react-icons/fa";
import profileImage from "@/assets/images/profile.png";

// Import API
import { updateUserProfile } from "../api/userApi";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    password: "",
    profilePicture: profileImage,
  });

  const [newProfilePicture, setNewProfilePicture] = useState(null);

  // Load user from localStorage and prefill form
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      const userData = {
        name: loggedInUser.Name || loggedInUser.name,
        email: loggedInUser.email,
        bio: loggedInUser.bio || "",
        password: "",
        profilePicture: loggedInUser.profilePicture || profileImage,
      };
      setUser(userData);
      // Prefill form fields
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("bio", userData.bio);
      setValue("password", "");
    }
  }, [setValue]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const updatedData = {
      ...user,
      ...data,
      profilePicture: newProfilePicture || user.profilePicture,
    };

    try {
      const response = await updateUserProfile(updatedData);
      console.log(response.data);

      localStorage.setItem("user", JSON.stringify(updatedData));
      setUser(updatedData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[700px] p-2 border border-blue-700">
        <CardHeader className="flex flex-col items-center">
          <label htmlFor="profilePicture" className="relative cursor-pointer">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={newProfilePicture || user.profilePicture}
                alt="User Avatar"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
            <FaCamera className="absolute bottom-1 right-6 text-white bg-black rounded-full p-1 h-5 w-8" />
          </label>
          <p className="mt-2 text-lg font-semibold">{user.name}</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  placeholder="User name"
                  {...register("name", { required: "Name is required" })}
                  defaultValue={user.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  defaultValue={user.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Bio</Label>
                <Input
                  placeholder="Tell something about yourself"
                  {...register("bio")}
                  defaultValue={user.bio}
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                className="w-full bg-purple-500 text-white mt-5"
              >
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

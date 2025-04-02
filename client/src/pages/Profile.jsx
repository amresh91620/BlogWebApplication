import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profile from "@/assets/images/profile.png";

const Profile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[700px] p-2 border border-blue-700">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile} alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <p className="mt-2 text-lg font-semibold">Amresh Kumar</p>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input placeholder="User name" />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Enter email" />
            </div>

            <div>
              <Label>Bio</Label>
              <Input placeholder="Tell something about yourself" />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="Enter Password" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button className="w-full bg-purple-500 text-white">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;

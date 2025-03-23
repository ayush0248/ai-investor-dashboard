"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Pencil, Save, User } from "lucide-react";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  dob: string;
  address: string;
  website: string;
  aboutMe: string;
  aadhaar: string;
  pan: string;
  upiId: string;
  bankAccount: string;
  ifscCode: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    mobile: "987-654-3210",
    dob: "1990-01-01",
    address: "123 Main Street, City, State, 12345",
    website: "johndoe.com",
    aboutMe: "Professional with 5+ years of experience",
    aadhaar: "1234 5678 9012",
    pan: "ABCDE1234F",
    upiId: "johndoe@upi",
    bankAccount: "12345678901234",
    ifscCode: "ABCD0001234",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
  };

  return (
    <div className="py-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">My Profile</h1>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="flex gap-2 items-center"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" /> Save Profile
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" /> Edit Profile
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="text-2xl">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">Change Photo</Button>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-medium mb-6">Personal Information</h2>
              <Separator className="mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={profileData.firstName} onChange={handleInputChange} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={profileData.lastName} onChange={handleInputChange} disabled={!isEditing} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={profileData.email} onChange={handleInputChange} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input id="mobile" value={profileData.mobile} onChange={handleInputChange} disabled={!isEditing} />
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={profileData.dob} onChange={handleInputChange} disabled={!isEditing} />
              </div>
              <div className="space-y-2 mb-6">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" value={profileData.address} onChange={handleInputChange} disabled={!isEditing} />
              </div>
            </div>
          </div>

          <h2 className="text-lg font-medium mb-6">Financial Details</h2>
          <Separator className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input id="aadhaar" value={profileData.aadhaar} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Card Number</Label>
              <Input id="pan" value={profileData.pan} onChange={handleInputChange} disabled={!isEditing} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input id="upiId" value={profileData.upiId} onChange={handleInputChange} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankAccount">Bank Account Number</Label>
              <Input id="bankAccount" value={profileData.bankAccount} onChange={handleInputChange} disabled={!isEditing} />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input id="ifscCode" value={profileData.ifscCode} onChange={handleInputChange} disabled={!isEditing} />
          </div>
        </CardContent>

        {isEditing && (
          <CardFooter className="flex justify-end gap-4 border-t pt-6">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Pencil, Save, User } from "lucide-react";

const ProfilePage = () => {
  const auth = getAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
    aadhaar: "",
    pan: "",
    bankAccount: "",
    ifscCode: "",
  });

  // ✅ Fetch user profile data
  useEffect(() => {
    const fetchProfile = async (email: string | null) => {
      if (!email) return;
      try {
        const response = await fetch(`http://localhost:5000/api/profile?email=${email}`, {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");
        fetchProfile(user.email);
      }
    });
  }, []);

  // ✅ Handle Save Profile
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const result = await response.json();
      alert(result.message || "Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    }
  };

  // ✅ Handle Input Changes
  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  return (
    <div className="py-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">My Profile</h1>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="flex gap-2 items-center"
        >
          {isEditing ? <><Save className="h-4 w-4" /> Save</> : <><Pencil className="h-4 w-4" /> Edit</>}
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="text-2xl"><User className="h-12 w-12" /></AvatarFallback>
              </Avatar>
              {isEditing && <Button variant="outline" size="sm">Change Photo</Button>}
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
                  <Input id="email" type="email" value={userEmail} disabled />
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

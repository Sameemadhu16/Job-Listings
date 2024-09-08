import React, { useState } from "react";
import { Label, TextInput, Textarea, Button } from "flowbite-react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    posterId: "",
    seekerId: "",
    postId: "",
    response: "",
    name: "",
    address: "",
    age: "",
    nic: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Perform form submission or API call
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      {/* Poster ID */}
      

      {/* Seeker ID */}
      

      {/* Post ID */}
      

      {/* Response */}
      <div>
        <Label htmlFor="response" value="Response" />
        <Textarea
          id="response"
          name="response"
          value={formData.response}
          onChange={handleChange}
          rows={3}
          className="mt-1"
        />
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="name" value="Name" />
        <TextInput
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1"
        />
      </div>

      {/* Address */}
      <div>
        <Label htmlFor="address" value="Address" />
        <TextInput
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      {/* Age */}
      <div>
        <Label htmlFor="age" value="Age" />
        <TextInput
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      {/* NIC */}
      <div>
        <Label htmlFor="nic" value="NIC" />
        <TextInput
          id="nic"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" value="Email" />
        <TextInput
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full mt-4">
        Submit
      </Button>
    </form>
  );
};

export default ApplicationForm;

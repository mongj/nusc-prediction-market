import { useState } from "react";
import { Button } from "@/components/primitives";

function Reset() {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add actual reset password API call here
    console.log("Participant ID:", username);
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    // Example validation
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    
    // Reset implementation would go here
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row items-center justify-between">
      <div className="hidden h-full w-full md:w-[50vw] lg:min-w-[800px] place-content-center place-items-end bg-[#f7faed] shadow-md md:flex">
        <img src="/images/poster.png" alt="Poster" className="w-[80%] object-contain" />
      </div>
      <div className="relative flex h-full w-full place-content-center place-items-center">
        <div className="absolute top-6 sm:top-16 left-6 sm:left-16">
          <span className="text-xl sm:text-2xl font-bold text-green-800">NUSC</span>
          <span className="text-xl sm:text-2xl font-bold text-green-600">Predict</span>
        </div>
        <form className="flex flex-col place-items-start gap-3 sm:gap-4 w-full p-5 sm:p-8 max-w-96" onSubmit={handleSubmit}>
          <h2 className="my-2 sm:my-4 text-3xl sm:text-4xl font-bold">Reset Password</h2>
          
          <div className="flex w-full flex-col">
            <label htmlFor="username" className="text-sm font-normal leading-6 text-black">
              Participant ID
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="P-000..."
              required
              className="w-full rounded-md border border-neutral-300 p-2"
            />
          </div>
          
          <div className="flex w-full flex-col">
            <label htmlFor="oldPassword" className="text-sm font-normal leading-6 text-black">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              required
              className="w-full rounded-md border border-neutral-300 p-2"
            />
          </div>
          
          <div className="flex w-full flex-col">
            <label htmlFor="newPassword" className="text-sm font-normal leading-6 text-black">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
              className="w-full rounded-md border border-neutral-300 p-2"
            />
          </div>
          
          <div className="flex w-full flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-normal leading-6 text-black">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full rounded-md border border-neutral-300 p-2"
            />
          </div>
          
          {errorMessage && <span className="text-sm text-red-500 text-left">{errorMessage}</span>}
          <Button text="Reset Password" className="w-full mt-2" color="green" />
        </form>
      </div>
    </div>
  );
}

export default Reset;
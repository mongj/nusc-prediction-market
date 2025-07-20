import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { api } from "@/api";
import { Button } from "@/components/primitives";

function Reset() {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    setIsLoading(true);

    api
      .post("/auth/reset-password", {
        friendly_id: username,
        current_password: oldPassword,
        new_password: newPassword,
      })
      .then(() => {
        toast.success("Password reset successfully! You are now logged in.");
        navigate("/dashboard");
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Invalid details provided. Please try again.";
        setErrorMessage(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row items-center justify-between bg-white">
      <div className="hidden h-full w-full md:w-[50vw] lg:min-w-[800px] place-content-center place-items-end bg-[#f7faed] shadow-md md:flex">
        <img src="/images/poster.png" alt="Poster" className="w-[80%] object-contain" />
      </div>
      <div className="relative flex h-full w-full place-content-center place-items-center bg-white">
        <div className="absolute top-6 sm:top-16 left-6 sm:left-16">
          <span className="text-xl sm:text-2xl font-bold text-sky-500">NUSC</span>
          <span className="text-xl sm:text-2xl font-bold text-lime-600">Predict</span>
        </div>
        
        <div className="w-full max-w-96 px-5 sm:px-0">
          <form 
            className="flex flex-col place-items-start gap-4 sm:gap-5 w-full p-5 sm:p-8 rounded-2xl border border-neutral-100 shadow-sm" 
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-sm text-gray-500 -mt-2">Change your password to secure your account</p>
            
            <div className="flex w-full flex-col space-y-1.5">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Participant ID
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="P-000..."
                autoComplete="username"
                required
                className="w-full rounded-md border border-neutral-300 p-2.5 text-gray-800 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
              />
            </div>
            
            <div className="flex w-full flex-col space-y-1.5">
              <label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your current password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-neutral-300 p-2.5 text-gray-800 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
              />
            </div>
            
            <div className="flex w-full flex-col space-y-1.5">
              <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                autoComplete="new-password"
                required
                className="w-full rounded-md border border-neutral-300 p-2.5 text-gray-800 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
              />
            </div>
            
            <div className="flex w-full flex-col space-y-1.5">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                autoComplete="new-password"
                required
                className="w-full rounded-md border border-neutral-300 p-2.5 text-gray-800 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
              />
            </div>
            
            {errorMessage && (
              <div className="w-full rounded-md bg-red-50 p-3 border border-red-100">
                <span className="text-sm text-red-600">{errorMessage}</span>
              </div>
            )}
            
            <Button 
              text={isLoading ? "Processing..." : "Reset Password"} 
              className="w-full mt-2" 
              color="green" 
              disabled={isLoading}
            />
            
            <div className="text-center w-full text-xs sm:text-sm text-gray-500 mt-4">
              Remember your password? <a href="/login" className="text-green-600 hover:text-green-700">Back to login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
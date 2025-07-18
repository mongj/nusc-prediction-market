import { HttpStatusCode } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { api } from "@/api";
import { Button } from "@/components/primitives";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    api
      .post("/auth/signin", {
        friendlyId: username,
        password,
      })
      .then((response) => {
        console.log("Login successful. Full response data:", response.data);
        toast.success("Signed in successfully");
        const isAdmin = response.data.data.isAdmin;
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          setErrorMessage("Invalid credentials, please try again.");
        } else {
          setErrorMessage("An error occurred, please try again later.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row items-center justify-between bg-white">
      <div className="hidden h-full w-full md:w-[50vw] lg:min-w-[800px] place-content-center place-items-end bg-[#f7faed] shadow-md md:flex">
        <img src="/images/tree.png" alt="Poster" className="w-[80%] object-contain" />
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-500 -mt-2">Enter your credentials to access your account</p>
            
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
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
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
              text={isLoading ? "Logging in..." : "Log In"} 
              className="w-full mt-2" 
              color="green" 
              disabled={isLoading}
            />

            <div className="w-full text-center mt-4">
              <p className="text-sm text-gray-500">
                Reset Password?{" "}
                <a href="/reset" className="text-green-600 hover:underline">
                  Click here to reset
                </a>
              </p>
            </div>
            
            <div className="text-center w-full text-xs sm:text-sm text-gray-500 mt-4">
              Having trouble? Contact @predictionmarkets on Telegram
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
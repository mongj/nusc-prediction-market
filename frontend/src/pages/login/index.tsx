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
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    api
      .post("/auth/signin", {
        friendlyId: username,
        password,
      })
      .then(() => {
        toast.success("Signed in successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response.status === HttpStatusCode.Unauthorized) {
          setErrorMessage("Invalid credentials, please try again.");
        } else {
          setErrorMessage("An error occurred, please try again later.");
        }
      });
  };

  return (
    <div className="flex h-screen w-full items-center justify-between">
      <div className="hidden h-full w-[50vw] min-w-[800px] place-content-center place-items-end bg-[#f7faed] shadow-md 2xl:flex">
        <img src="/images/tree.png" alt="Poster" className="w-[80%] object-contain" />
      </div>
      <div className="relative flex h-full w-full place-content-center place-items-center">
        <div className="absolute top-16 left-16">
          <span className="text-2xl font-bold text-green-800">NUSC</span>
          <span className="text-2xl font-bold text-green-600">Predict</span>
        </div>
        <form className="flex flex-col place-items-start gap-4 w-full p-8 max-w-96" onSubmit={handleSubmit}>
          <h2 className="my-4 text-4xl font-bold">Log In</h2>
          <div className="flex w-full flex-col">
            <label htmlFor="username" className="text-center text-sm font-normal leading-6 text-black sm:text-left">
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
            <label htmlFor="password" className="text-center text-sm font-normal leading-6 text-black sm:text-left">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-md border border-neutral-300 p-2"
            />
          </div>
          {errorMessage && <span className="text-sm text-red-500 text-left">{errorMessage}</span>}
          <Button text="Log In" className="w-full mt-2" />
        </form>
      </div>
    </div>
  );
}

export default Login;

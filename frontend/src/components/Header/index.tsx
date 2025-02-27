import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { api } from "@/api";
import { Button } from "@/components/primitives";

const Header = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    api.post("/auth/signout").then(() => {
      toast.success("Signed out successfully");
      navigate("/login");
    });
  };

  return (
    <div className="flex w-full place-items-center place-content-between">
      <div className="text-4xl font-bold">
        <span className="text-green-800">NUSC</span>
        <span className="text-green-600">Predict</span>
      </div>

      <div className="flex w-fit gap-2">
        <Button text="Help" variant="secondary" onClick={() => alert("Help button clicked!")} className="w-24" />
        <Button
          text="Contact Us"
          variant="secondary"
          onClick={() => navigate("/dashboard/contact-us")}
          className="w-32"
        />
        <Button text="Sign Out" color="red" onClick={handleSignOut} className="w-24" />
      </div>
    </div>
  );
};

export default Header;

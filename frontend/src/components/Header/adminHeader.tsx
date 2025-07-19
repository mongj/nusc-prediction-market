import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { api } from "@/api";
import { Button } from "@/components/primitives";

import ContactDialog from "./ContactDialog";

const AdminHeader = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    api.post("/auth/signout").then(() => {
      toast.success("Signed out successfully");
      navigate("/login");
    });
  };

  const handleResetPassword = () => {
    navigate("/admin/reset-password");
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex w-full place-items-center place-content-between">
      <div className="text-4xl font-bold">
        <span className="text-sky-500">NUSC</span>
        <span className="text-lime-600">Predict</span>
      </div>

      <div className="flex w-fit gap-2">
        <Button text="Reset Password" variant="secondary" onClick={handleResetPassword} className="w-32" />
        <Button text="Contact Us" variant="secondary" onClick={handleOpenDialog} className="w-32" />
        <Button text="Sign Out" color="red" onClick={handleSignOut} className="w-24" />
        <ContactDialog open={isDialogOpen} handleClose={handleCloseDialog} />
      </div>
    </div>
  );
};

export default AdminHeader;

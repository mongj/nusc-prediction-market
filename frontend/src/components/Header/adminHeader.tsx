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
    <div className="flex w-full flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-0">
      <div className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-0">
        <span className="text-sky-500">NUSC</span>
        <span className="text-lime-600">Predict</span>
      </div>

      <div className="flex flex-col sm:flex-row w-full sm:w-fit gap-2 sm:gap-2 items-center sm:items-center">
        <Button
          text="Reset Password"
          variant="secondary"
          onClick={handleResetPassword}
          className="w-3/4 sm:w-32 text-xs sm:text-base"
        />
        <Button
          text="Contact Us"
          variant="secondary"
          onClick={handleOpenDialog}
          className="w-3/4 sm:w-32 text-xs sm:text-base"
        />
        <Button
          text="Sign Out"
          color="red"
          onClick={handleSignOut}
          className="w-3/4 sm:w-24 text-xs sm:text-base"
        />
        <ContactDialog open={isDialogOpen} handleClose={handleCloseDialog} />
      </div>
    </div>
  );
};

export default AdminHeader;
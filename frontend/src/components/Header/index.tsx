import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { api } from "@/api";
import { Button } from "@/components/primitives";

import ContactDialog from "./ContactDialog";

const Header = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    api.post("/auth/signout").then(() => {
      toast.success("Signed out successfully");
      navigate("/login");
    });
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex w-full items-center justify-between flex-wrap gap-2 py-2">
      <div className="text-2xl sm:text-4xl font-bold">
        <span className="text-sky-500">NUSC</span>
        <span className="text-lime-600">Predict</span>
      </div>

      <div className="flex w-fit gap-1 sm:gap-2">
        <Button
          text="Contact Us"
          variant="secondary"
          onClick={handleOpenDialog}
          className="w-20 sm:w-32 text-xs sm:text-base py-1 sm:py-2"
          size="small"
        />
        <Button
          text="Sign Out"
          color="red"
          onClick={handleSignOut}
          className="w-16 sm:w-24 text-xs sm:text-base py-1 sm:py-2"
          size="small"
        />
        <ContactDialog open={isDialogOpen} handleClose={handleCloseDialog} />
      </div>
    </div>
  );
};

export default Header;
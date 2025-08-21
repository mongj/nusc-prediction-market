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
      <div className="font-nunito text-2xl sm:text-4xl font-extrabold">
        <span className="text-sky-500">NUSC</span>
        <span className="text-lime-600">limate</span>
      </div>

      <div className="flex w-fit gap-2 sm:gap-3">
        <Button
          text="Contact Us"
          variant="secondary"
          onClick={handleOpenDialog}
          className="w-28 sm:w-40 text-sm sm:text-lg py-2 sm:py-3 px-3 sm:px-4"
          size="medium"
        />
        <Button
          text="Sign Out"
          color="red"
          onClick={handleSignOut}
          className="w-24 sm:w-32 text-sm sm:text-lg py-2 sm:py-3 px-3 sm:px-4"
          size="medium"
        />
        <ContactDialog open={isDialogOpen} handleClose={handleCloseDialog} />
      </div>
    </div>
  );
};

export default Header;
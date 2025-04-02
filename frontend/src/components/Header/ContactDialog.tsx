import Dialog from "@mui/material/Dialog";

export interface SimpleDialogProps {
  open: boolean;
  handleClose: () => void;
}

function ContactDialog({ handleClose, open }: SimpleDialogProps) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="flex flex-col space-y-1 text-lg p-8">
        <p className="font-bold">Telegram: @predictionmarkets</p>
        <p className="font-bold">Email: jonus.ho@u.nus.edu</p>
        <p className="font-bold">Principal Investigator: Dr Michelle Lee</p>
        <p className="text-sm italic text-gray-800">This is a research project under NUSCollege</p>
      </div>
    </Dialog>
  );
}

export default ContactDialog;

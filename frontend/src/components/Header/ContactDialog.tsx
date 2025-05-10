import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
import SchoolIcon from "@mui/icons-material/School";
import IconButton from "@mui/material/IconButton";

export interface SimpleDialogProps {
  open: boolean;
  handleClose: () => void;
}

function ContactDialog({ handleClose, open }: SimpleDialogProps) {
  return (
    <Dialog 
      onClose={handleClose} 
      open={open}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          maxWidth: '400px',
          width: '100%'
        }
      }}
    >
      <div className="relative">
        <div className="absolute right-4 top-4 flex items-center justify-center">
          <IconButton 
            onClick={handleClose}
            size="small"
            className="flex items-center justify-center p-1"
            aria-label="close"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        
        <div className="p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4 pb-2 border-b border-gray-200">
            Contact Information
          </h3>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <TelegramIcon className="text-blue-500" />
              <div>
                <p className="font-medium">Telegram</p>
                <p className="text-gray-700">@predictionmarkets</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <EmailIcon className="text-red-500" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-700">jonus.ho@u.nus.edu</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <SchoolIcon className="text-amber-700" />
              <div>
                <p className="font-medium">Principal Investigator</p>
                <p className="text-gray-700">Dr Michelle Lee</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-500 italic">
              This is a research project under NUSCollege
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ContactDialog;
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const CoinDisplay = ({ coins }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="flex justify-between gap-4 rounded-2xl border-2 border-gray-300 bg-white p-4 shadow-sm">
      <div className="flex flex-row space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#D4AF37"
          className="bi bi-coin"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
        </svg>
        <div className="flex flex-col text-left">
          <div className="pt-1 font-extrabold sm:pt-0">{coins}</div>
          <div className="text-sm text-gray-400">Total coins</div>
        </div>
      </div>
      <a
        href="#"
        className="flex items-end text-xs text-gray-500 underline underline-offset-1 hover:text-gray-400"
        onClick={handleClick}
      >
        What is this?
      </a>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 1 }}>Total amount of coins you have earned.</Typography>
        <Typography sx={{ p: 1 }}>You can use these coins to make predictions.</Typography>
        <Typography sx={{ p: 1 }}>Converted to real currency at the end of the run.</Typography>
      </Popover>
    </div>
  );
};

export default CoinDisplay;

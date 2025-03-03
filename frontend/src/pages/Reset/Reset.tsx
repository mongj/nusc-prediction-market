import { useState } from "react";

function Reset() {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Participant ID:", username);
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="flex items-center justify-between">
      <img className="hidden h-[650px] w-[650px] sm:block" src="/images/poster.png" alt="Placeholder" />
      <div className="flex w-[375px] flex-1 flex-col items-start justify-start gap-12 p-20 sm:w-full sm:overflow-auto">
        <div className="flex flex-col items-center justify-start gap-2 self-stretch sm:items-start">
          <h2 className="text-[42px] font-bold leading-[46.2px] text-[#21272A]">Reset Password</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5 flex w-fit flex-col gap-[9px] sm:w-[480px]">
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
              className="w-fit rounded-md border border-gray-300 p-2 text-base text-gray-400"
            />
          </div>
          <div className="mb-5 flex w-fit flex-col gap-[9px] sm:w-[480px]">
            <label htmlFor="oldPassword" className="text-center text-sm font-normal leading-6 text-black sm:text-left">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              required
              className="w-fit rounded-md border border-gray-300 p-2 text-base text-gray-400"
            />
          </div>
          <div className="mb-5 flex w-fit flex-col gap-[9px] sm:w-[480px]">
            <label htmlFor="newPassword" className="text-center text-sm font-normal leading-6 text-black sm:text-left">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
              className="w-fit rounded-md border border-gray-300 p-2 text-base text-gray-400"
            />
          </div>
          <div className="mb-5 flex w-fit flex-col gap-[9px] sm:w-[480px]">
            <label
              htmlFor="confirmPassword"
              className="text-center text-sm font-normal leading-6 text-black sm:text-left"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-fit rounded-md border border-gray-300 p-2 text-base text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="relative flex h-[54px] w-full cursor-pointer items-center justify-center border-none bg-none sm:w-[480px]"
          >
            <div className="absolute h-full w-full rounded-[16px] bg-[#0369A1]"></div>
            <div className="absolute h-[49.09px] w-full rounded-[16px] bg-[#0EA5E9]"></div>
            <div className="z-10 text-base font-semibold leading-6 text-white">Reset Password</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reset;

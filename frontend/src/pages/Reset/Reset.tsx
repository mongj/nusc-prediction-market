import { useState } from 'react';

function Reset() {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Participant ID:', username);
        console.log('Old Password:', oldPassword);
        console.log('New Password:', newPassword);
        console.log('Confirm Password:', confirmPassword);
    };

    return (
        <div className="flex justify-between items-center">
            <img className="w-[650px] h-[650px] hidden sm:block" src="/images/poster.png" alt="Placeholder"/>
            <div className="flex-1 p-20 flex flex-col justify-start items-start gap-12 w-[375px] sm:w-full sm:overflow-auto">
                <div className="self-stretch flex flex-col justify-start items-center sm:items-start gap-2">
                    <h2 className="text-[#21272A] text-[42px] font-bold leading-[46.2px]">Reset Password</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[9px] w-fit sm:w-[480px] mb-5">
                        <label htmlFor="username" className="text-black text-sm font-normal leading-6 text-center sm:text-left">Participant ID</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="P-000..."
                            required
                            className="p-2 border border-gray-300 rounded-md text-base text-gray-400 w-fit"
                        />
                    </div>
                    <div className="flex flex-col gap-[9px] w-fit sm:w-[480px] mb-5">
                        <label htmlFor="oldPassword" className="text-black text-sm font-normal leading-6 text-center sm:text-left">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Old Password"
                            required
                            className="p-2 border border-gray-300 rounded-md text-base text-gray-400 w-fit"
                        />
                    </div>
                    <div className="flex flex-col gap-[9px] w-fit sm:w-[480px] mb-5">
                        <label htmlFor="newPassword" className="text-black text-sm font-normal leading-6 text-center sm:text-left">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            required
                            className="p-2 border border-gray-300 rounded-md text-base text-gray-400 w-fit"
                        />
                    </div>
                    <div className="flex flex-col gap-[9px] w-fit sm:w-[480px] mb-5">
                        <label htmlFor="confirmPassword" className="text-black text-sm font-normal leading-6 text-center sm:text-left">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                            className="p-2 border border-gray-300 rounded-md text-base text-gray-400 w-fit"
                        />
                    </div>
                    <button type="submit" className="relative w-full sm:w-[480px] h-[54px] flex justify-center items-center bg-none border-none cursor-pointer">
                        <div className="absolute w-full h-full bg-[#0369A1] rounded-[16px]"></div>
                        <div className="absolute w-full h-[49.09px] bg-[#0EA5E9] rounded-[16px]"></div>
                        <div className="text-white text-base font-semibold leading-6 z-10">Reset Password</div>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Reset;

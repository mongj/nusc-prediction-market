import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="flex justify-between items-center">
      <img className="w-[650px] h-[650px] hidden sm:block" src="/images/poster.png" alt="Placeholder"/>
      <div className="flex-1 p-20 flex flex-col justify-start items-start gap-12 w-[375px] sm:w-full sm:overflow-auto">
        <div className="self-stretch flex flex-col justify-start items-center sm:items-start gap-2">
          <h2 className="text-[#21272A] text-[42px] font-bold leading-[46.2px]">Log In</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[9px] w-full sm:w-[480px] mb-5">
            <label htmlFor="username" className="text-black text-sm font-normal leading-6 text-center sm:text-left">Participant ID</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="P-000..."
              required
              className="p-2 border border-gray-300 rounded-md text-base text-gray-400 w-full"
            />
          </div>
          <div className="flex flex-col gap-[9px] w-full sm:w-[480px] mb-5">
            <label htmlFor="password" className="text-black text-sm font-normal leading-6 text-center sm:text-left">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="p-2 border border-gray-300 rounded-md text-base text-gray-400 w-full"
            />
          </div>
          <button type="submit" className="relative w-full sm:w-[480px] h-[54px] flex justify-center items-center bg-none border-none cursor-pointer">
            <div className="absolute w-full h-full bg-[#0369A1] rounded-[16px]"></div>
            <div className="absolute w-full h-[49.09px] bg-[#0EA5E9] rounded-[16px]"></div>
            <div className="text-white text-base font-semibold leading-6 z-10">Log In</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

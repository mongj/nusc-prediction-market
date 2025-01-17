import { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import '../../styles/App.css';

function Master() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Master Page</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/pages/Home/Home.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Links below to pages
            </p>
            <div className="navigation-buttons">
                <button onClick={() => window.location.href = '/dashboard'}>Dashboard Page</button>
                <button onClick={() => window.location.href = '/login'}>Login Page</button>
                <button onClick={() => window.location.href = '/dashboard/contactus'}>Contact Us Page</button>
                <button onClick={() => window.location.href = '/history'}>History Page</button>
                <button onClick={() => window.location.href = '/predict'}>Predict Page</button>
                <button onClick={() => window.location.href = '/reset'}>Reset Page</button>
            </div>
        </>
    );
}

export default Master;
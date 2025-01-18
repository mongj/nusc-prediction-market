import { useNavigate } from 'react-router-dom';
import HelpButton2 from '../../components/Buttons/HelpButton2/HelpButton2';
import SignOutButton from '../../components/Buttons/SignOutButton/SignOutButton';
import Button from '../../components/Buttons/Button/Button';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="flex w-full justify-between items-center">
            <h1 className="text-4xl font-bold">NUSC Prediction Market Study</h1>
            <div className='flex-row flex space-x-4'>
                <HelpButton2 text="Help" onClick={() => alert('Help button clicked!')} />
                <Button text="Contact Us" onClick={() => navigate('/dashboard/contactus')} />
                <SignOutButton text="Sign Out" onClick={() => alert('Sign Out button clicked!')} />
            </div>
        </div>
    );
};

export default Header;
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import YetToStartBox from '../../components/StatusBoxes/YetToStartBox';

const Progress = ({ progress }) => (
    <div className='flex flex-col text-lg space-y-1'>
        <div className="bg-white border-2 border-gray-300 shadow-sm flex flex-col justify-between rounded-2xl py-4 px-6">
            <h2 className='font-bold text-left'>My Progress</h2>
            <p className='text-sm font-semibold text-left pt-4 pb-2'>{progress.questionsAnswered}/30 questions answered</p>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(progress.questionsAnswered / 30) * 100}%` }}></div>
            </div>
            {progress.milestones.map((milestone, index) => (
                <div key={index} className="flex flex-col items-start py-2">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <p className='text-md font-medium pr-10'>Milestone {index + 1}</p>
                            <YetToStartBox />
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="flex justify-start space-x-2">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`milestone-circle ${i < milestone.answered ? 'completed' : ''}`}
                                    >{i + 1}</div>
                                ))}
                            </div>
                            <p className="text-sm text-left text-gray-500 pt-1">{(milestone.answered + 1) < 5 ? `Answer ${4 - milestone.answered} more question(s) to get the bonus for this milestone` : 'You have achieved the bonus for this milestone!'}</p>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </div>
    </div>
);

export default Progress;
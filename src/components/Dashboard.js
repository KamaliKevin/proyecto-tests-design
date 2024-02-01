import { useState } from 'react';
import {MDBTabsContent, MDBTabsPane, MDBTabs, MDBTabsItem, MDBTabsLink, MDBIcon} from 'mdb-react-ui-kit';
import Profile from './dashboard/Profile';
import Settings from './dashboard/Settings';
import QuizHistory from './dashboard/QuizHistory';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <MDBTabs justify className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick('profile')} active={activeTab === 'profile'}>
                        <MDBIcon fas icon="user-cog" /> Profile
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick('settings')} active={activeTab === 'settings'}>
                        <MDBIcon fas icon="cog" /> Settings
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick('quizHistory')} active={activeTab === 'quizHistory'}>
                        <MDBIcon fas icon="list-alt" /> Quiz History
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane open={activeTab === 'profile'}>
                    <Profile />
                </MDBTabsPane>
                <MDBTabsPane open={activeTab === 'settings'}>
                    <Settings />
                </MDBTabsPane>
                <MDBTabsPane open={activeTab === 'quizHistory'}>
                    <QuizHistory />
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    );
}

export default Dashboard;
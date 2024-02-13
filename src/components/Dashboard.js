import { useState } from 'react';
import {MDBTabsContent, MDBTabsPane, MDBTabs, MDBTabsItem, MDBTabsLink, MDBIcon} from 'mdb-react-ui-kit';
import Profile from './DashboardComponents/Profile';
import Settings from './DashboardComponents/Settings';
import QuizHistory from './DashboardComponents/QuizHistory';
import UserManagement from "./DashboardComponents/UserManagement";
import QuizManagement from "./DashboardComponents/QuizManagement";
import ContactManagement from "./DashboardComponents/ContactManagement";

const Dashboard = ({ userIsAdmin }) => {
    const [activeTab, setActiveTab] = useState('profile');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <MDBTabs justify className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick('profile')} active={activeTab === 'profile'}>
                        <MDBIcon fas icon="user-cog" /> Perfil
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
                {userIsAdmin && (
                    <>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleTabClick('user-management')} active={activeTab === 'user-management'}>
                                <MDBIcon fas icon="users-cog" /> User Management
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleTabClick('quiz-management')} active={activeTab === 'quiz-management'}>
                                <MDBIcon fas icon="list-ul" /> Quiz Management
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleTabClick('contact-management')} active={activeTab === 'contact-management'}>
                                <MDBIcon fas icon="phone-square" /> Contact Management
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </>
                )}
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
                {userIsAdmin && (
                    <>
                        <MDBTabsPane open={activeTab === 'user-management'}>
                            <UserManagement/>
                        </MDBTabsPane>
                        <MDBTabsPane open={activeTab === 'quiz-management'}>
                            <QuizManagement/>
                        </MDBTabsPane>
                        <MDBTabsPane open={activeTab === 'contact-management'}>
                            <ContactManagement/>
                        </MDBTabsPane>
                    </>
                )}
            </MDBTabsContent>
        </div>
    );
}

export default Dashboard;
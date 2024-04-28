import React from "react";
import LoginForm from "../pages/LoginForm/LoginForm.tsx";
import RegisterForm from "../pages/RegisterForm/RegisterForm.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "../pages/Landing/Landing.tsx";
import BookingPages from '../pages/BookingPages/BookingPages.tsx'
import AdminPanel from "../pages/AdminPanel/AdminPanel.tsx";
import { checkUser } from "../../helpers/hocs/checkUser.tsx";
import checkUserType from "../../helpers/hocs/checkUserType.tsx";
import StudentsList from "../pages/StudentsList/StudentsList.tsx";
import AllStudents from "../pages/AllStudents/AllStudents.tsx";
import AllTrainers from "../pages/AllTrainers/AllTrainers.tsx";
import Navigation from "../components/Navigation/Navigation.tsx";
import FieldsSettings from "../pages/AdminPanel/Settings/FieldsSettings/FieldsSettings.tsx";
import Settings from "../pages/AdminPanel/Settings/Settings.tsx";
import CreateTrainers from "../pages/AdminPanel/Settings/CreateTrainers/CreateTrainers.tsx";
import CreateStudents from "../pages/AdminPanel/Settings/CreateStudents/CreateStudents.tsx";
import CreateParents from "../pages/AdminPanel/Settings/CreateParrents/CreateParrents.tsx";
// import CreateGroup from "../pages/AdminPanel/Settings/CreateSection/CreateSection.tsx";
import Fields from "../pages/Fields/Fields.tsx";
import Cabinet from "../pages/Cabinet/Cabinet.tsx";
import GroupsSetting from "../pages/AdminPanel/Settings/GroupsSetting/GroupsSetting.tsx";
import Attendance from "../pages/Attendance/Attendance.tsx";
import { AttendanceTable } from "../components/AttendanceTable/AttendanceTable.tsx";
import AllGroups from '../pages/AllGroups/AllGroups.tsx'
import PaymentsTable from "../pages/PaymentsTable/PaymentsTable.tsx";
import Analytics from "../pages/Analytics/Analytics.tsx";
import PaymentAcceptTranslation from "../components/PaymentAcceptTranslation/PaymentAcceptTranslation.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import DashboardOld from "../pages/Dashboard/DashboardOld.tsx";
import StudentCabinet from "../pages/Cabinet/StudentCabinet.tsx";
import SettingsParents from "../pages/AdminPanel/Settings/SettingsParents/SettingsParents.tsx";
import AllParents from "../pages/AllParents/AllParents.tsx";
import EditInfo from "../pages/Cabinet/EditInfo.tsx";
import ScheduleFields from "../pages/Schedule/ScheduleFields.tsx";

import TrainerBio from "../pages/Cabinet/TrainerBio.tsx";
import TrainerInfo from "../pages/Cabinet/TrainerInfo.tsx";
import ParentInfo from "../pages/Cabinet/EditInfo.tsx";
import Statistics from "../pages/Statistics/Statistics.tsx";
import './Layouts.scss'
import ChildTable from "../pages/Cabinet/ChildTable.tsx";
import { AttendanceTableAnalytics } from "../components/AttendanceTable/AttendanceTableAnalytics/AttendanceTableAnalytics.tsx";
import { AttendanceTableTrainer } from "../components/AttendanceTable/AttendanceTableAnalytics/AttendanceTableTrainer.tsx";
import Progress from "../pages/Cabinet/Progress.tsx";
import AllChildrens from "../pages/AllChildrens/AllChildrens.tsx";
import ClientAnalytics from "../pages/Cabinet/ClientAnalytics.tsx";
import ChildAnalytics from "../pages/Cabinet/ChildAnalytics.tsx";
import { TrainerGrops } from "../pages/Cabinet/TrainerCabinet/TrainerGrops.tsx";
import CreateSectionNew from "../pages/AdminPanel/Settings/CreateSection/CreateSectionNew.tsx";

const Layouts = () => {
    return (
        <Router>
            <LayoutContent />
        </Router>
    );
};

const LayoutContent = () => {

    return (
        <div>
            <Navigation checkUserType={checkUserType()} />
            <div>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<RegisterForm />} />
                    <Route path="/cabinet" element={<Cabinet checkUserType={checkUserType()} />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/attendance-trainers" element={<AttendanceTableAnalytics />} />
                    <Route path="/attendance-trainer/:id" element={<AttendanceTableTrainer />} />
                    <Route path="/attendance/:id" element={<AttendanceTable />} />
                    <Route path="/edit_info/:id" element={<EditInfo />} />
                    <Route path="/schedule" element={<ScheduleFields />} />
                    {/* <Route path="/payments/:id" element={<PaymentAcceptTranslation />} /> */}


                    <Route path="/dashboard" element={<Dashboard />} />


                    {/* Fields pages */}
                    <Route path="/fields" element={<Fields />} />
                    <Route path="/fields/:id" element={<BookingPages checkUser={() => checkUser()} />} />

                    {/* Trainer pages */}
                    {/* {checkUserType() === 'trainer' && <Route path="/groups" element={<AllGroups />} />} */}
                    {/* {checkUserType() === 'trainer' && <Route path="/groups/:id" element={<StudentsList />} />} */}
                    {checkUserType() === 'trainer' && <Route path="/groups/:id" element={<TrainerGrops />} />}
                    {checkUserType() === 'trainer' && <Route path="/user_bio" element={<TrainerBio />} />}
                    {checkUserType() === 'trainer' && <Route path="/user_info" element={<TrainerInfo />} />}
                    {checkUserType() === 'trainer' && <Route path="/client_analytics" element={<ClientAnalytics />} />}
                    {checkUserType() === 'trainer' && <Route path="/child_analytics" element={<ChildAnalytics />} />}


                    {/* Student-Parent pages */}
                    {checkUserType() === 'student' && <Route path="/parent_info" element={<ParentInfo />} />}

                    {checkUserType() === 'parent' && <Route path="/parent_info" element={<ParentInfo />} />}
                    {checkUserType() === 'parent' && <Route path="/children" element={<AllChildrens />} />}
                    {checkUserType() === 'parent' && <Route path="/children/:id" element={<StudentCabinet />} />}
                    {checkUserType() === 'parent' && <Route path="/payments/:id" element={<ChildTable />} />}
                    {checkUserType() === 'parent' && <Route path="/progress" element={<Progress />} />}

                    {/* Admin pages */}
                    {checkUserType() === 'admin' && <Route path="/admin-panel" element={<AdminPanel />} />}
                    {checkUserType() === 'admin' && <Route path="/students" element={<AllStudents />} />}
                    {checkUserType() === 'admin' && <Route path="/trainers" element={<AllTrainers />} />}
                    {checkUserType() === 'admin' && <Route path="/payments" element={<PaymentsTable />} />}
                    {checkUserType() === 'admin' && <Route path="/analytics-clients" element={<Analytics />} />}
                    {checkUserType() === 'admin' && <Route path="/statistics" element={<Statistics />} />}

                    {/* Admin panel settings */}
                    {checkUserType() === 'admin' && <Route path="/admin-panel/settings" element={<Settings />} />}

                    {checkUserType() === 'admin' && <Route path="/admin-panel/settings/fields" element={<FieldsSettings />} />}
                    {checkUserType() === 'admin' && <Route path="/admin-panel/settings/trainers" element={<CreateTrainers />} />}

                    {checkUserType() === 'admin' && <Route path="/admin-panel/settings/parents" element={<SettingsParents />} />}
                    {checkUserType() === 'admin' && <Route path="/admin-panel/settings/parents/create" element={<CreateParents />} />}
                    {checkUserType() === 'admin' && <Route path="/admin-panel/settings/parents/add" element={<AllParents />} />}
                    {checkUserType() === 'admin' && <Route path="/admin-panel/settings/parents/add/:id" element={<CreateParents />} />}

                    {/* {checkUserType() === 'admin' && <Route path="/admin-panel/settings/create-groups" element={<CreateGroup />} />} */}
                    {checkUserType() === 'admin' && <Route path="/admin-panel/settings/sections" element={<CreateSectionNew/>} />}

                    {checkUserType() === 'admin' && <Route path="/admin-panel/groups" element={<GroupsSetting />} />}


                </Routes>
            </div>
        </div>
    );
};

export default Layouts;

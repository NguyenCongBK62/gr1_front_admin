import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';
import JobForm from './components/JobForm/JobForm';
import Layout from './containers/Layout/Layout';
import Login from './containers/Login/Login';

export default function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="jobs" element={<JobForm />} />
          <Route path="companyprofile" element={<CompanyProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

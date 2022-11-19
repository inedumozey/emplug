import React, { useContext, useEffect } from 'react'
import { connect } from 'react-redux'

import pageRoutes from '../routes'

/// React router dom
import { Switch, Route } from 'react-router-dom'

/// App
import Profile from './components/AppsMenu/AppProfile/Profile'
import Organisation from './components/AppsMenu/Organisation/Organisations'
import OrganisationDetails from './components/AppsMenu/Organisation/OrganisationDetails'
import CBT from './pages/CBT/cbt'

import { isAuthenticated } from '../store/selectors/AuthSelectors'
import Admin from './pages/Admin/Admin'
import Application from './pages/Application/Application'
import FormBuilder from './pages/FormBuilder/form-builder'
import Jobs from './pages/Jobs/jobs'
import ForgotPassword from './pages/ForgotPassword'
import JobView from './pages/JobView/job-view'
import ApplyJob from './pages/ApplyJob/apply-job'
import CreateOrganization from './pages/CreateOrganization/create-organization'
import OrganizationPage from './pages/OrganizationPage/organization-page'
import JobOffer from './pages/JobOffer/job-offer'
import Kpi from './pages/KPI/kpi'
import AllQuestions from './pages/AllQuestion/all-questions'
import MyApplications from './pages/MyApplications/my-applications'
import ResetPassword from './pages/ResetPassword/reset-password'
import Messages from './pages/Messages/messages'
import CreateNewJob from './pages/CreateNewJob/create-new-job'
import PipelineManager from './pages/PipelineManager/pipeline-manager'
import Pipeline from './pages/Pipeline/pipeline'
import ViewUser from './pages/ViewUser/view-user'
import Talents from './pages/Talents/talents'
import GetPipeline from './pages/GetPipline/get-pipeline'
import TermsAndCondition from './pages/TermsAndCondition/termsAndCondition'
import CreatePipeline from './pages/CreatePipeline/create-pipeline'
import MedicalDashboard from './pages/Medical/MedicalDashboard'
import MedicalSettings from './pages/Medical/MedicalSettings'
import CBTDashboard from './pages/CBT/CBTDashboard'
import ApplicationDashboard from './pages/ApplicationForm/ApplicationDashboard'
import ApplicationSettings from './pages/ApplicationForm/ApplicationSettings'
import InterviewDashboard from './pages/Interview/InterviewDashboard'
import InterviewSettings from './pages/Interview/InterviewSettings'
import CBTSettings from './pages/CBT/CBTSettings'
import OfficialLetter from './pages/OfficialLetter/OfficialDashboard'
import OfficialSettings from './pages/OfficialLetter/OfficialSettings'
import SuperAdmin from './pages/SuperAdmin/super-admin'
import Notifications from './pages/Notifications/notifications'
import EditUser from './pages/SuperAdmin/edit-user'
import EditOrganization from './pages/SuperAdmin/edit-organization'
import EditProfile from './components/AppsMenu/AppProfile/EditProfile'
import ListOfTalents from './pages/Talents2/talents'

const Markup = props => {
  const routes = [
    { url: pageRoutes.home, component: Jobs },
    { url: pageRoutes.profile, component: Profile },
    { url: pageRoutes.admin, component: Admin },
    { url: pageRoutes.application, component: CreateNewJob },
    { url: pageRoutes.organisation, component: Organisation },
    { url: pageRoutes.organisationPage, component: OrganizationPage },
    { url: pageRoutes.createOrganisation, component: CreateOrganization },
    { url: pageRoutes.formBuilder, component: FormBuilder },
    { url: pageRoutes.test, component: CBT },
    { url: pageRoutes.forgotPassword, component: ForgotPassword },
    { url: pageRoutes.job, component: JobView },
    { url: pageRoutes.apply, component: ApplyJob },
    { url: pageRoutes.jobOffer, component: JobOffer },
    { url: pageRoutes.kpi, component: Kpi },
    { url: pageRoutes.allQuestion, component: AllQuestions },
    { url: pageRoutes.myApplications, component: MyApplications },
    { url: pageRoutes.pipelineManager, component: PipelineManager },
    { url: pageRoutes.pipeline, component: Pipeline },
    { url: pageRoutes.viewUser, component: ViewUser },
    { url: pageRoutes.talents, component: Talents },
    { url: pageRoutes.getPipeline, component: GetPipeline },
    { url: pageRoutes.createPipeline, component: CreatePipeline },
    { url: pageRoutes.medicalDashboard, component: MedicalDashboard },
    { url: pageRoutes.medicalSettings, component: MedicalSettings },
    { url: pageRoutes.cbtDashboard, component: CBTDashboard },
    { url: pageRoutes.cbtSettings, component: CBTSettings },
    { url: pageRoutes.applicationDashboard, component: ApplicationDashboard },
    { url: pageRoutes.applicationSettings, component: ApplicationSettings },
    { url: pageRoutes.interviewDashboard, component: InterviewDashboard },
    { url: pageRoutes.interviewSettings, component: InterviewSettings },
    { url: pageRoutes.officialLetter, component: OfficialLetter },
    { url: pageRoutes.officialSettings, component: OfficialSettings },
    { url: pageRoutes.message, component: Messages },
    { url: pageRoutes.superAdmin, component: SuperAdmin },
    { url: pageRoutes.notifications, component: Notifications },
    { url: pageRoutes.superAdminUser, component: EditUser },
    { url: pageRoutes.superAdminOrg, component: EditOrganization },
  { url: pageRoutes.editProfile, component: EditProfile },
  { url: pageRoutes.allUsers, component: ListOfTalents },
    // { url: pageRoutes.termsAndCondition, component: TermsAndCondition },
    // { url: pageRoutes.resetPassword, component: Messages },
  ]
  return (
    <>
      {routes.map((data, i) => (
        <Route
          key={i.toString()}
          exact
          path={data.url}
          component={data.component}
        />
        
      ))}
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state)
})

export default connect(mapStateToProps)(Markup)



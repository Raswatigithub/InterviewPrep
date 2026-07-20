import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import AIToolsPage from '../pages/AIToolsPage';
import AuthPage from '../pages/AuthPage';
import ChecklistPage from '../pages/ChecklistPage';
import LandingPage from '../pages/LandingPage';
import MaterialsPage from '../pages/MaterialsPage';
import QuestionBankPage from '../pages/QuestionBankPage';
import StudyFocusPage from '../pages/StudyFocusPage';
import SyllabusPage from '../pages/SyllabusPage';
// import WorkspaceSimulator from '../components/WorkspaceSimulator';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route element={<AppLayout />}>
        <Route path="study-focus" element={<StudyFocusPage />} />
        <Route path="question-bank" element={<QuestionBankPage />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="syllabus" element={<SyllabusPage />} />
        <Route path="ai-tools" element={<AIToolsPage />} />
        {/* <Route path="workspace" element={<WorkspaceSimulator />} /> */}
        <Route path="checklist" element={<ChecklistPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

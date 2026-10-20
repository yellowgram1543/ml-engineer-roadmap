import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import roadmapJson from './data/roadmapData.json';
import { RoadmapData } from './types/roadmap';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LevelPage } from './pages/LevelPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';

const data = roadmapJson as unknown as RoadmapData;

export function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-slate-900">
      <Header data={data} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage data={data} />} />
          <Route path="/level/:levelId" element={<LevelPage data={data} />} />
          <Route path="/projects" element={<ProjectsPage data={data} />} />
          <Route path="/100-days/projects" element={<ProjectsPage data={data} />} />
          <Route path="/interview-prep" element={<InterviewPrepPage data={data} />} />
          <Route path="/100-days/interview-prep" element={<InterviewPrepPage data={data} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

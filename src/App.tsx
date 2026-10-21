import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import roadmapJson from './data/roadmapData.json';
import dsaRoadmapJson from './data/dsaRoadmapData.json';
import { RoadmapData } from './types/roadmap';
import { DsaRoadmapData } from './types/dsaRoadmap';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LevelPage } from './pages/LevelPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';
import { DsaHomePage } from './pages/DsaHomePage';
import { DsaBlockPage } from './pages/DsaBlockPage';
import { DsaPatternsPage } from './pages/DsaPatternsPage';
import { DsaAppliedTrackPage } from './pages/DsaAppliedTrackPage';
import { DsaCheckpointsPage } from './pages/DsaCheckpointsPage';

const data = roadmapJson as unknown as RoadmapData;
const dsaData = dsaRoadmapJson as unknown as DsaRoadmapData;

export function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-slate-900">
      <Header data={data} dsaData={dsaData} />
      <div className="flex-1">
        <Routes>
          {/* ML Roadmap Routes */}
          <Route path="/" element={<HomePage data={data} />} />
          <Route path="/level/:levelId" element={<LevelPage data={data} />} />
          <Route path="/projects" element={<ProjectsPage data={data} />} />
          <Route path="/100-days/projects" element={<ProjectsPage data={data} />} />
          <Route path="/interview-prep" element={<InterviewPrepPage data={data} />} />
          <Route path="/100-days/interview-prep" element={<InterviewPrepPage data={data} />} />

          {/* DSA Roadmap Routes */}
          <Route path="/dsa" element={<DsaHomePage data={dsaData} />} />
          <Route path="/dsa/block/:blockId" element={<DsaBlockPage data={dsaData} />} />
          <Route path="/dsa/patterns" element={<DsaPatternsPage data={dsaData} />} />
          <Route path="/dsa/applied-track" element={<DsaAppliedTrackPage data={dsaData} />} />
          <Route path="/dsa/checkpoints" element={<DsaCheckpointsPage data={dsaData} />} />

          {/* Fallback */}
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

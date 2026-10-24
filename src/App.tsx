import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import roadmapJson from './data/roadmapData.json';
import dsaRoadmapJson from './data/dsaRoadmapData.json';
import koreanRoadmapJson from './data/koreanRoadmapData.json';
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
import { DsaNegotiationPage } from './pages/DsaNegotiationPage';
import { DsaSqlPage } from './pages/DsaSqlPage';
import { DsaCheatsheetsPage } from './pages/DsaCheatsheetsPage';
import { DsaCsFundamentalsPage } from './pages/DsaCsFundamentalsPage';
import { KoreanHomePage } from './pages/KoreanHomePage';
import { KoreanLevelPage } from './pages/KoreanLevelPage';
import { KoreanProjectsPage } from './pages/KoreanProjectsPage';
import { KoreanQuestionsPage } from './pages/KoreanQuestionsPage';

const data = roadmapJson as unknown as RoadmapData;
const dsaData = dsaRoadmapJson as unknown as DsaRoadmapData;
const koreanData = koreanRoadmapJson as unknown as RoadmapData;

export function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-slate-900">
      <Header data={data} dsaData={dsaData} koreanData={koreanData} />
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
          <Route path="/dsa/sql" element={<DsaSqlPage data={dsaData} />} />
          <Route path="/dsa/cheatsheets" element={<DsaCheatsheetsPage data={dsaData} />} />
          <Route path="/dsa/cs-fundamentals" element={<DsaCsFundamentalsPage data={dsaData} />} />
          <Route path="/dsa/applied-track" element={<DsaAppliedTrackPage data={dsaData} />} />
          <Route path="/dsa/checkpoints" element={<DsaCheckpointsPage data={dsaData} />} />
          <Route path="/dsa/negotiation" element={<DsaNegotiationPage data={dsaData} />} />

          {/* Korean Roadmap Routes */}
          <Route path="/korean" element={<KoreanHomePage data={koreanData} />} />
          <Route path="/korean/level/:levelId" element={<KoreanLevelPage data={koreanData} />} />
          <Route path="/korean/projects" element={<KoreanProjectsPage data={koreanData} />} />
          <Route path="/korean/questions" element={<KoreanQuestionsPage data={koreanData} />} />

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

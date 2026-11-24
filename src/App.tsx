/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LeafCareProvider } from './context/LeafCareContext';
import { AdvisorPage } from './pages/AdvisorPage';
import { HistoryPage } from './pages/HistoryPage';
import { HomePage } from './pages/HomePage';
import { PreviewPage } from './pages/PreviewPage';
import { ResultsPage } from './pages/ResultsPage';

export default function App() {
  return (
    <BrowserRouter>
      <LeafCareProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/advisor" element={<AdvisorPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </LeafCareProvider>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { DashboardLayout } from './components/layout/DashboardLayout';
import { TransactionsPage } from './pages/TransactionsPage';
import { ReconciliationPage } from './pages/ReconciliationPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/transactions" replace />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="reconciliation" element={<ReconciliationPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/transactions" replace />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

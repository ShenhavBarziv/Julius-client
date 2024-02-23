import AppRoutes from './routes/AppRoutes'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AuthProvider } from './context/AuthContext';
import 'dayjs/locale/de';
function App() {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <AppRoutes />
      </LocalizationProvider>
    </AuthProvider>

  );
}

export default App;

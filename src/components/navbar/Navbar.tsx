import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, MenuItem } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import * as Constants from './constants';

function Navbar({ admin = false }: { admin?: boolean }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function disconnect() {
    alert("Disconnecting...");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    logout();
    navigate("/login");
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333333' }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="p"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >{Constants.NAV_WEBSITE_NAME}</Typography>
        <MenuItem>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography textAlign="center">{Constants.NAV_PROFILE_TEXT}</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/employee-list" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography textAlign="center">{Constants.NAV_LIST_TEXT}</Typography>
          </Link>
        </MenuItem>
        {admin && (
          <MenuItem>
            <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography textAlign="center">{Constants.NAV_ADMIN_TEXT}</Typography>
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <Typography textAlign="center" onClick={disconnect}>{Constants.NAV_DISCONNECT_TEXT}</Typography>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

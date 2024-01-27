import { Link as RouterLink } from 'react-router-dom';
import { Typography, Link, Container, CssBaseline } from '@mui/material';
import * as Constants from './constant';

const NotFound = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        {Constants.NOT_FOUND_TITLE}
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        {Constants.NOT_FOUND_DESCRIPTION}
      </Typography>
      <Typography variant="body1" align="center">
        <Link
          component={RouterLink}
          to="/"
          color="primary"
          variant="h6"
        >
          {Constants.GO_BACK_HOME}
        </Link>
      </Typography>
    </Container>
  );
};

export default NotFound;

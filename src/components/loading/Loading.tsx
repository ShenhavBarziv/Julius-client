import { Container, CircularProgress, Typography } from '@mui/material'
import * as Constant from "./constant"
function Loading() {
    return (
        <Container style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                {Constant.LOADING_MSG}
            </Typography>
        </Container>
    )
}

export default Loading
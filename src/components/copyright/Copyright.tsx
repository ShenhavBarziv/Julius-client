import { Link, Typography } from '@mui/material'
import * as Constants from './constants'
function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link target="_blank" color="inherit" href={Constants.MY_WEBSITE_URL}>
                {Constants.NAME}
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    )
}

export default Copyright
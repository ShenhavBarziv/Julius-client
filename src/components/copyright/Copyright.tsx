import { Link, Typography } from '@mui/material'
import React from 'react'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link target="_blank" color="inherit" href="http://shenhav.xyz">
                Shenhav
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    )
}

export default Copyright
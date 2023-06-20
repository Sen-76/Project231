import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { INewsPaper } from '../../interface/new';

interface IProp {
    newDetail: INewsPaper;
}

const FeaturePostDetail: React.FC<IProp> = ({ newDetail }) => {
    const test = newDetail?.image ? require('../../ImageSave/' + newDetail?.image) : '';
    const firstItemTitle = newDetail && newDetail.title ? newDetail.title : 'no data';
    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${test})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {newDetail?.image ? (
                <img style={{ display: 'none' }} src={require('../../ImageSave/' + newDetail.image)} alt={''} />
            ) : (
                <div></div>
            )}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {firstItemTitle}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default FeaturePostDetail;

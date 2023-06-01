import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { INewsPaper } from '../NewsPaperListManager/model';
import * as newspaperService from '../../services/newsPaperService';
import { Link } from 'react-router-dom';

interface IProp{
    idpost: string;
}

function  Featurepost () {
    const [newsPaperList, setNewsPaperList] = useState<INewsPaper[]>([]);
    useEffect(() => 
    {
        newspaperService
            .getnewsPaperList(1)
            .then((result: INewsPaper[]) => {
                if (result) {
                    setNewsPaperList(result);
                }
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, []);

    const firstItemImg = newsPaperList[0] && newsPaperList[0].image ? newsPaperList[0].image : 'no data';
    const firstItemId = newsPaperList[0] && newsPaperList[0].id ? newsPaperList[0].id : 'no data';
    const firstItemTitle = newsPaperList[0] && newsPaperList[0].title ? newsPaperList[0].title : 'no data';
    const firstItemContent = newsPaperList[0] && newsPaperList[0].content ? newsPaperList[0].content : 'no data';
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
                backgroundImage: `url(${firstItemImg})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={firstItemImg} alt={''} />}
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
                        <Typography variant="h5" color="inherit" paragraph>
                            {firstItemContent}
                        </Typography>
                        <Link className="readmore" to={`/newsdetail/${firstItemId}`}>
                            read more
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
export default Featurepost;
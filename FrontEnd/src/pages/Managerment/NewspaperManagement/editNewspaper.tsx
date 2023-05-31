import React, { useEffect, useState } from 'react';
import { INewsPaperDetail } from '../../../components/NewsPaperListManager/model';
import * as newspaperService from '../../../services/newDetailService';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

export default function ListNewspaper() {
    const { id } = useParams();
    const [newsPaper, setNewsPaper] = useState<INewsPaperDetail>();
    useEffect(() => {
        newspaperService
            .getNewDetail(id || '')
            .then((result: INewsPaperDetail) => {
                if (result) {
                    setNewsPaper(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <React.Fragment>
            <div className="titleCategoryM">Edit:</div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className='first'>
                    <div>Author:</div>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue={newsPaper?.author.name}
                        InputProps={{
                            style: {
                                width: '900px',
                                height: '100%',
                            },
                        }}
                    />
                </div>
                <div>
                    <div>Content:</div>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={6}
                        defaultValue={newsPaper?.content}
                        InputProps={{
                            style: {
                                width: '900px',
                                height: '100%',
                            },
                        }}
                    />
                </div>
                <div>
                    <div>Description:</div>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        defaultValue={newsPaper?.description}
                        InputProps={{
                            style: {
                                width: '900px',
                                height: '100%',
                            },
                        }}
                    />
                </div>

                <div>
                    <div>Title:</div>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        defaultValue={newsPaper?.title}
                        InputProps={{
                            style: {
                                width: '900px',
                                height: '100%',
                            },
                        }}
                    />
                </div>

                <div className='actionButton'>
                    <Button>Save</Button>
                    <Button>Close</Button>
                </div>
            </Box>
        </React.Fragment>
    );
}

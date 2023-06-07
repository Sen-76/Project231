import React, { useEffect, useState } from 'react';
import { INewsPaperDetail } from '../../../components/NewsPaperListManager/model';
import * as newspaperService from '../../../services/newDetailService';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { Button, FormControl } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor';

export default function ListNewspaper() {
    const { id } = useParams();
    const [newsPaper, setNewsPaper] = useState<INewsPaperDetail>();

    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setEditorContent(data);
        // setNewsPaper({ ...newsPaper, content: data.toString() });
        console.log(newsPaper);
    };

    useEffect(() => {
        newspaperService
            .getNewDetail(id ?? '')
            .then((result: INewsPaperDetail) => {
                if (result) {
                    setNewsPaper(result);
                    console.log(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <React.Fragment>
            <div className="titleCategoryM">Edit Newspaper:</div>
            <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                <FormControl fullWidth>
                    <label htmlFor="input-author">Author</label>
                    <TextField id="input-author" />
                </FormControl>
                <div>
                    <h2>CKEditor 5 Example</h2>
                    <CKEditor editor={ClassicEditor} data={editorContent} onChange={handleEditorChange} />
                </div>
                <FormControl fullWidth>
                    <label htmlFor="input-content">Content</label>
                    <TextField id="input-content" />
                </FormControl>

                <FormControl fullWidth>
                    <label htmlFor="input-description">Description</label>
                    <TextField id="input-description" multiline rows={4} />
                </FormControl>

                <FormControl fullWidth>
                    <label htmlFor="input-title">Title</label>
                    <TextField id="input-title" multiline rows={4} />
                </FormControl>

                <div className="actionButton">
                    <Button>Save</Button>
                    <Button>Close</Button>
                </div>
            </Box>
        </React.Fragment>
    );
}

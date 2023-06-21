import { Box, TextField, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import * as commentService from '../../../services/commentService';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
interface CmtProps {
    setResetComment: () => void;
}

function Cmt({ setResetComment }: CmtProps) {
    const { id } = useParams();
    const [content, setContent] = useState<string>('');
    async function AddComment() {
        commentService
            .addComment(content, id || '')
            .then((result) => {
                if (result.success) {
                    setResetComment();
                    setContent('');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <>
            <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'row' }}>
                <FormControl fullWidth variant="filled">
                    <TextField
                        value={content}
                        id="input-name"
                        variant="outlined"
                        label="Viết comment của bạn tại đây"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </FormControl>
                <Button variant="contained" endIcon={<SendIcon />} onClick={AddComment}>
                    Send
                </Button>
            </Box>
        </>
    );
}

export default Cmt;

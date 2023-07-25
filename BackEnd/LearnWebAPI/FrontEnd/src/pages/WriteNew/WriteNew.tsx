import { Box, Button, Chip, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { INewsPaperAdd, defaultNewsPaperAdd } from '../../interface/new';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ICategory } from '../../interface/category';
import * as categoryService from '../../services/categoryService';
import * as newspaperService from '../../services/newsPaperService';

function WriteNew() {
    const [newsPaper, setNewsPaper] = useState<INewsPaperAdd>(defaultNewsPaperAdd);
    const [cate, setCate] = useState<ICategory[]>([]);
    useEffect(() => {
        categoryService
            .listCate()
            .then((result: ICategory[]) => {
                if (result) {
                    setCate(result);
                }
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, []);
    async function SaveNews() {
        const news = new FormData();
        news.append('title', newsPaper.title);
        news.append('content', newsPaper.content);
        news.append('description', newsPaper.description);
        news.append('image', newsPaper.image ?? '');
        news.append('categoryId', newsPaper.categoryId.join(','));
        await newspaperService
            .addnewsPaper(news)
            .then((result: any) => {
                if (result) window.location.href = '/newspapermanagement';
            })
            .catch((error: any) => {
                console.error(error);
            });
    }
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = (event.target.files as FileList)[0];
        setNewsPaper({ ...newsPaper, image: file || null });
    };
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setNewsPaper({ ...newsPaper, categoryId: typeof value === 'string' ? value.split(',') : value });
    };
    return (
        <div>
            <span>Write new</span>
            <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                <FormControl fullWidth>
                    <label htmlFor="input-avatar">Image</label>
                    <TextField
                        type="file"
                        variant="outlined"
                        onChange={handleFileChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            accept: '.jpg,.png,.jpeg,.webp',
                        }}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <label htmlFor="input-title">Title</label>
                    <TextField
                        id="input-title"
                        onChange={(event: any) => setNewsPaper({ ...newsPaper, title: event.target.value })}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <label htmlFor="input-content">Content</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={newsPaper.content}
                        onChange={(event: any, editor: any) => {
                            const data = editor.getData();
                            setNewsPaper({ ...newsPaper, content: data });
                        }}
                        id="input-content"
                    />
                </FormControl>
                <FormControl fullWidth>
                    <label htmlFor="input-description">Description</label>
                    <TextField
                        id="input-description"
                        multiline
                        rows={4}
                        onChange={(event: any) => setNewsPaper({ ...newsPaper, description: event.target.value })}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <label htmlFor="input-cate">Category</label>
                    <Select
                        id="input-cate"
                        multiple
                        value={newsPaper.categoryId}
                        onChange={handleChange}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => {
                                    const category = cate.find((cat) => cat.id === value);
                                    return <Chip key={value} label={category ? category.name : ''} />;
                                })}
                            </Box>
                        )}
                    >
                        {cate.map((cate) => (
                            <MenuItem key={cate.id} value={cate.id}>
                                {cate.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="actionButton">
                    <Button onClick={SaveNews}>Write</Button>
                    <Button>Close</Button>
                </div>
            </Box>
        </div>
    );
}

export default WriteNew;

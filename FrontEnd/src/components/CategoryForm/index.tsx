import { useState, useEffect } from 'react';
import * as categoryService from '../../services/categoryService';
import { ICategory } from './model';

function CategoryForm() {
    const [name, setName] = useState<string>('');
    const [reLoadList, setReloadList] = useState<boolean>(false);
    const [listCate, setListCate] = useState<ICategory[]>([]);
    async function Add() {
        await categoryService.addCate(name)
        setName('')
        setReloadList(!reLoadList);
    }
    async function Delete(id: string) {
        await categoryService.deleteCate(id)
        setReloadList(!reLoadList);
    }
    useEffect(() => {
        categoryService.listCate().then((result) => {
            if (result) {
                setListCate(result);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [reLoadList])
    return (
        <div>
            <form>
                <div>Add Category Form</div>
                <div className="form-item">
                    <input value={name} type="text" placeholder='Input Category Name' onChange={(e) => setName(e.target.value)} />
                </div>
                <button type='button' onClick={Add}>Add</button>
            </form>
            <ul>
                {
                    listCate.map((category) => (
                        <li key={category.id}>
                            <span style={{display: 'inline-block', minWidth: 200}}>{category.name}</span> 
                            <button type='button' onClick={() => Delete(category.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default CategoryForm;
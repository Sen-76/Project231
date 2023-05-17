import { useState, useEffect } from 'react';
import * as categoryService from '../../services/categoryService';
import { INewsPaper, DEFAULTS_NEW, INewsPaperAdd } from './model';
import { ICategory } from '../CategoryAddForm/model';
import * as newspaperService from '../../services/newsPaperService';
    
function NewsPaperForm() {
    const [news, setNews] = useState<INewsPaperAdd>(DEFAULTS_NEW);
    const [listCate, setListCate] = useState<ICategory[]>([]);
    const Add = () => {
        newspaperService.addnewsPaper(news)
    };
    useEffect(() => {
        categoryService.listCate().then((result) => {
            if (result) {
                setListCate(result);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])
    return (
        <div>
            <form>
                <div>Add Category Form</div>
                <div className="form-item">
                    <input
                        value={news?.title}
                        type="text"
                        placeholder="Input Title"
                        onChange={(e) => setNews({ ...news, title: e.target.value })}
                    />
                    <input
                        value={news?.content}
                        type="text"
                        placeholder="Input Content"
                        onChange={(e) => setNews({ ...news, content: e.target.value })}
                    />
                    <input
                        value={news?.description}
                        type="text"
                        placeholder="Input Description"
                        onChange={(e) => setNews({ ...news, description: e.target.value })}
                    />
                    <div>
                        {
                            listCate.map(cate => (
                                <div key={cate.id}>
                                    <input type="checkbox" id={cate.id} name="vehicle1" value={cate.id} />
                                    <label htmlFor={cate.id}>{cate.name}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button type="button" onClick={Add}>
                    Add
                </button>
            </form>
        </div>
    );
}

export default NewsPaperForm;
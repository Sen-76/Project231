import { useState, useEffect } from 'react';
import * as categoryService from '../../../services/categoryService';
import * as newspaperService from '../../../services/newsPaperService';
import { INewsPaper, DEFAULTS_NEW, INewsPaperAdd } from './model';
import { ICategory } from '../CategoryForm/model';

function NewsPaperForm() {
    const [news, setNews] = useState<INewsPaperAdd>(DEFAULTS_NEW);
    const [listCate, setListCate] = useState<ICategory[]>([]);
    const [listNews, setListNews] = useState<INewsPaper[]>([]);
    const [reLoadList, setReloadList] = useState<boolean>(false);
    async function Add() {
        await newspaperService.addnewsPaper(news)
        setReloadList(!reLoadList);
    };
    async function Publish(id: string) {
        await newspaperService.publishnewsPaper(id)
        setReloadList(!reLoadList);
    }
    async function Delete(id: string) {
        await newspaperService.deletenewsPaper(id)
        setReloadList(!reLoadList);
    }
    async function Restore(id: string) {
        await newspaperService.restorenewsPaper(id)
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
        ////////////////////////////////////////////////////////////////////////
        newspaperService.getnewsPaperList(1).then((result) => {
            setListNews(result);
        }).catch((error) => {
            console.error(error);
        });
    }, [reLoadList])
    return (
        <div>
            <form>
                <div>Add News Form</div>
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
                        choose category
                        {
                            listCate.map(cate => (
                                <div key={cate.id}>
                                    <input type="checkbox" id={cate.id} value={cate.id} onChange={() => setNews({ ...news, categoryId: [...news.categoryId, cate.id] })} />
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
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>content</th>
                        <th>description</th>
                        <th>createdDate</th>
                        <th>modifiedDate</th>
                        <th>publishedDate</th>
                        <th>status</th>
                        <th>categories</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listNews?.map((news: INewsPaper) => (
                            <tr key={news.id}>
                                <td>{news.id}</td>
                                <td>{news.title}</td>
                                <td>{news.content}</td>
                                <td>{news.description}</td>
                                <td>{news.createdDate}</td>
                                <td>{news.modifiedDate}</td>
                                <td>{news.publishedDate}</td>
                                <td>{news.status}</td>
                                <td>{news.categories?.map(cate => <span key={cate.id}>{cate.name},</span>)}</td>
                                <td>
                                    <button type="button" onClick={() => Publish(news.id)} >Publish</button>
                                    <button type="button" onClick={() => Delete(news.id)} >Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default NewsPaperForm;
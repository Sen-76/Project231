import { useEffect, useState } from 'react';
import './index.scss';
import * as newspaperService from '../../services/newsPaperService';
import { INewsPaper } from '../../components/News/PopularNews/model';
import PopularNews from '../../components/News/PopularNews';
import { Link, useParams } from 'react-router-dom';
import LastestArticles from '../../components/News/LastestArticles';

function Category() {
    const [newsPaperList, setNewsPaperList] = useState<INewsPaper[]>([]);
    const [cateName, setCateName] = useState<string>('');
    const { category } = useParams();

    useEffect(() => {
        category && newspaperService.listnewsPaperByCate(category)
            .then((result) => {
                if (result) {
                    setCateName(result.cate.name)
                    setNewsPaperList(result.news);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [category]);
    return (
        <>
            <div className="titleListNews">
                All post relate to <b>{cateName}</b>
            </div>
            <article className="all-browsers">
                <div className="leftTab">
                    {newsPaperList.map((neww, key) => (
                        <div key={key} className="containerNewList">
                            <div className="imgContainerNewList">
                                <img src={neww.image}></img>
                            </div>
                            <article className="browser">
                                <div className="titleNewList">{neww.title}</div>
                                <p>
                                    {neww.description}
                                </p>
                                <Link className="readmore" to={`/newsdetail/${neww.id}`}>
                                    read more
                                </Link>
                            </article>
                            <div></div>
                        </div>
                    ))}
                </div>

                <div className="rightTab">
                    <PopularNews></PopularNews>
                </div>
            </article>
            <LastestArticles></LastestArticles>
        </>
    );
}
export default Category;

import { useEffect, useState } from 'react';
import './index.scss';
import * as newspaperService from '../../services/newsPaperService';
import { INewsPaper } from '../../components/News/PopularNews/model';
import PopularNews from '../../components/News/PopularNews';
import { Link, useParams } from 'react-router-dom';
import LastestArticles from '../../components/News/LastestArticles';

function Category() {
    const [newsPaperList, setNewsPaperList] = useState<INewsPaper[]>([]);
    const { category } = useParams();

    useEffect(() => {
        newspaperService
            .getnewsPaperList(1)
            .then((result: INewsPaper[]) => {
                if (result) {
                    setNewsPaperList(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <>
            <div className="titleListNews">
                All post relate to <b>{category}</b>
            </div>
            <article className="all-browsers">
                <div className="leftTab">
                    {newsPaperList.map((article, key) => (
                        <div key={key} className="containerNewList">
                            <div className="imgContainerNewList">
                                <img src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"></img>
                            </div>
                            <article className="browser">
                                <div className="titleNewList">{article.title}</div>
                                <p>
                                    Google Chrome is a web browser developed by Google, released in
                                    2008. Chrome is the world's most popular web browser today!
                                </p>
                                <Link className="readmore" to={`/newsdetail/${article.id}`}>
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
            <div className="single_left_coloum_wrapper">
                <h2 className="title">Latest Articles</h2>
                <a className="more" href="dashboard">
                    more
                </a>
                <LastestArticles></LastestArticles>
            </div>
        </>
    );
}
export default Category;

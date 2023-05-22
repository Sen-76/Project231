import { INewsPaper } from './model';
import * as newspaperService from '../../services/newsPaperService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PopularNews() {
    const [newsPaperList, setNewsPaperList] = useState<INewsPaper[]>([]);

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
        <div className="single_sidebar">
            <div className="popular">
                <h2 className="title">Popular</h2>
                <ul>
                    {newsPaperList.map((item) => {
                        return (
                            <li key={item.id}>
                                <div className="single_popular">
                                    <p>{item.createdDate}</p>
                                    <h3>
                                        {item.description}
                                        <Link className="readmore" to={`/newsdetail/${item.id}`}>
                                            read more
                                        </Link>
                                    </h3>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <a className="popular_more">more</a>
            </div>
        </div>
    );
}

export default PopularNews;

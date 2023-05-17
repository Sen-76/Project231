import { INewsPaper } from './model';
import * as newspaperService from '../../services/newsPaperService';
import { useEffect, useState } from 'react';

function PopularNews() {
    const [newsPaperList, setNewsPaperList] = useState<INewsPaper[]>([]);

    useEffect(() => {
        newspaperService.getnewsPaperList(1).then((result: INewsPaper[]) => {
            if (result) {
                setNewsPaperList(result);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])
    return (
        <div className="single_sidebar">
            <div className="popular">
                <h2 className="title">Popular</h2>
                <ul>
                    {
                        newsPaperList.map((items) => {
                            return (
                                <li key={items.id}>
                                    <div className="single_popular">
                                        <p>{items.createdDate}</p>
                                        <h3>
                                            {items.title}
                                            <a href="#" className="readmore">
                                                Read More
                                            </a>
                                        </h3>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <a className="popular_more">more</a>{' '}
            </div>
        </div>
    );
}

export default PopularNews;
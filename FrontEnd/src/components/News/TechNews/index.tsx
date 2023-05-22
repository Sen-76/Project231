import { useEffect, useState } from 'react';
import * as newspaperService from '../../../services/newsPaperService';
import { INewsPaper } from '../PopularNews/model';
import { Link } from 'react-router-dom';

function TechNews() {
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
        <div className="single_left_coloum_wrapper single_cat_left">
            <h2 className="title">Tech News</h2>
            <a className="more" href="#">
                more
            </a>
            {newsPaperList.map((item, key) => (
                <div key={key} className="single_cat_left_content floatleft">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link className="readmore" to={`/newsdetail/${item.id}`}>
                        read more
                    </Link>
                </div>
            ))}
        </div>
    );
}
export default TechNews;
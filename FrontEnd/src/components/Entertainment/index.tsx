import { useEffect, useState } from 'react';
import * as newspaperService from '../../services/newsPaperService';
import { INewsPaper } from '../PopularNews/model';
import { Link } from 'react-router-dom';

function Entertainment() {
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
        <>
            {newsPaperList.map((item, key) => (
                <div key={key} className="single_cat_right_content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link className="readmore" to={`/newsdetail/${item.id}`}>
                        read more
                    </Link>
                </div>
            ))}
        </>
    );
}
export default Entertainment;

import { useEffect, useState } from 'react';
import * as newspaperService from '../../services/newsPaperService';
import { INewsPaper } from '../PopularNews/model';

function TechNews(){
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
                <div key={key} className="single_cat_left_content floatleft">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <a className="readmore" href="#">
                        read more
                    </a>
                </div>
            ))}
        </>
    );
}
export default TechNews;
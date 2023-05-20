import { useEffect, useState } from 'react';
import * as newspaperService from '../../services/newsPaperService';
import { INewsPaper } from '../PopularNews/model';

function Entertainment(){
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
                    <p>{item.content}</p>
                    <a className="readmore" href="dashboard">
                        read more
                    </a>
                </div>
            ))}
        </>
    );
}
export default Entertainment;
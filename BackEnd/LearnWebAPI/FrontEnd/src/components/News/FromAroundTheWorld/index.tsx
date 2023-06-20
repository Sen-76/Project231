import { useEffect, useState } from 'react';
import * as newspaperService from '../../../services/newsPaperService';
import { INewsPaper } from '../PopularNews/model';
import { Link } from 'react-router-dom';
function FromAroundTheWorld() {
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
        <div className="single_left_coloum_wrapper">
            <h2 className="title">FROM AROUND THE WORLD</h2>
            <a className="more" href="#">
                more
            </a>
            {newsPaperList.map((item, key) => (
                <div key={key} className="single_left_coloum floatleft">
                    <img src={require(`../../../ImageSave/` + item.image)} alt={item.title} />
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
export default FromAroundTheWorld;

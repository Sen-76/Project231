import { DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { IDetailsListNewsPaperState, columns, DEFAULT_LIST_NEWSPAPER_STATE, INewsPaper } from './model';
import * as newspaperService from '../../services/newsPaperService';
import { useEffect, useState } from 'react';
import { setIconOptions } from '@fluentui/react/lib/Styling';

setIconOptions({
    disableWarnings: true
});

function NewsPaperListManagerment() {
    const [newsPaperList, setNewsPaperList] = useState<IDetailsListNewsPaperState>(DEFAULT_LIST_NEWSPAPER_STATE);

    useEffect(() => {
        newspaperService.getnewsPaperList().then((result: INewsPaper[]) => {
            if (result) {
                setNewsPaperList({ ...newsPaperList, items: result });
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    return (
        <div>
            <DetailsList
                items={newsPaperList.items}
                columns={columns}
                selectionMode={SelectionMode.multiple}
            />
        </div>
    );
}

export default NewsPaperListManagerment;
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import * as newspaperService from '../../../services/newsPaperService';
import { useEffect, useState } from 'react';
import { INewsPaper } from '../../../components/NewsPaperListManager/model';

export default function Orders() {
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
    <React.Fragment>
      <Title>Newspaper List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Modified Date</TableCell>
            <TableCell align="center">Desscription</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newsPaperList.map((row, key) => (
            <TableRow key={key}>
                <TableCell>{key}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.createdDate}</TableCell>
              <TableCell>{row.modifiedDate}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}
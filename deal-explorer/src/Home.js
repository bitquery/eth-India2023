import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

import getData from './data';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData();
                console.log(response)
                setApiData(response); // Adjust the property access accordingly
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell align="center">PieceCID</TableCell>
                        <TableCell align="center">PieceSize</TableCell>
                        <TableCell align="center">ProviderCollateral</TableCell>
                        <TableCell align="center">StartEpoch</TableCell>
                        <TableCell align="center">EndEpoch</TableCell>
                        <TableCell align="center">Accept Deal</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {apiData.map((row) => {
                        console.log(row[0])
                        return <>
                            <TableRow
                                key={row[0]}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">
                                    {row[5]}
                                </TableCell>
                                <TableCell align="center">{row[0]}</TableCell>
                                <TableCell align="center">{row[1]}</TableCell>
                                <TableCell align="center">{row[2]}</TableCell>
                                <TableCell align="center">{row[3]}</TableCell>
                                <TableCell align="center">{row[4]}</TableCell>
                                <TableCell align="center"><Button disabled={true} >Accept</Button></TableCell>
                            </TableRow>
                        </>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
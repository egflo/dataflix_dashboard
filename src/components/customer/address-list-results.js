import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useGetUsers} from "/src/service/service";
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Button,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import {DashboardLayout} from "../dashboard-layout";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/router'


export const AddressListResults = ({...rest }) => {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState([]);

    const handleSelectAll = (event) => {
        let newSelectedIds;

        if (event.target.checked) {
            newSelectedIds = content.map((item) => item.productId);
        } else {
            newSelectedIds = [];
        }

        selectedIds(newSelectedIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedIds.indexOf(id);
        let newSelectedIds = [];

        if (selectedIndex === -1) {
            newSelectedIds = newSelectedIds.concat(selectedIds, id);
        } else if (selectedIndex === 0) {
            newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
        } else if (selectedIndex === newSelectedIds.length - 1) {
            newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedIds = newSelectedIds.concat(
                selectedIds.slice(0, selectedIndex),
                selectedIds.slice(selectedIndex + 1)
            );
        }

        selectedIds(newSelectedIds);
    };
    
    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedIds.length === rest.addresses.length}
                                        color="primary"
                                        indeterminate={
                                            selectedIds.length > 0
                                            && selectedIds.length < content.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>
                                    Ref
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Unit
                                </TableCell>
                                <TableCell>
                                    Street Address
                                </TableCell>
                                <TableCell>
                                    City
                                </TableCell>
                                <TableCell>
                                    State
                                </TableCell>
                                <TableCell>
                                    Postcode
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rest.addresses.map((item) => (
                                <TableRow
                                    hover
                                    key={item.id}
                                    selected={selectedIds.indexOf(item.productId) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedIds.indexOf(item.productId) !== -1}
                                            onChange={(event) => handleSelectOne(event, item.productId)}
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {item.id}
                                    </TableCell>
                                    <TableCell>
                                        {item.firstname + ' ' + item.lastname}
                                    </TableCell>
                                    <TableCell>
                                        {item.unit}
                                    </TableCell>
                                    <TableCell>
                                        {item.street}
                                    </TableCell>
                                    <TableCell>
                                        {item.city}
                                    </TableCell>
                                    <TableCell>
                                        {item.state}
                                    </TableCell>
                                    <TableCell>
                                        {item.postcode}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => router.push(`/customer/address/${item.id}`)}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>
    );
};

//CustomerListResults.propTypes = {
//  customers: PropTypes.array.isRequired
//};

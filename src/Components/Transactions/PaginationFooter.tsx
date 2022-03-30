import React from 'react'
import {  TableRow, TableFooter, TablePagination  } from '@mui/material';
import { useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { ITransactionFiltered } from '../../Interfaces/ITransaction';


interface IPaginationFooterProps {
    data: Array<ITransactionFiltered>
    page: number,
    rowsPerPage: number,
    count: number,
    changePage: (page: number) => void,
    changeRowsPerPage:(row: number) => void
}

interface IPaginationComponentProps {
    count: number,
    page: number,
    rowsPerPage: number,
    onPageChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => void
}

const PaginationFooter = ({ data , page, changePage, rowsPerPage, changeRowsPerPage, count}: IPaginationFooterProps) => {

    const handlePageChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
      changePage(newPage);
    };
  
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
      changeRowsPerPage(parseInt(e.target.value, 10));
      changePage(0);
    };

  return (
    <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 15, 25, 50]}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={PaginationComponent}
                labelRowsPerPage={"Rows"}
              />
            </TableRow>
          </TableFooter>
  )
}


const PaginationComponent = ({ count, page, rowsPerPage, onPageChange }: IPaginationComponentProps) => {
    const theme = useTheme();

  
    const handleFirstPageButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onPageChange(e, 0);
    };
  
    const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onPageChange(e, page - 1);
    };
  
    const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onPageChange(e, page + 1);
    };
  
    const handleLastPageButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
}

PaginationComponent.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };


export default PaginationFooter
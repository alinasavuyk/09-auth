"use client";
import ReactPaginate from "react-paginate";

import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };


interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}


export default function Pagination({ totalPages, page, onPageChange }: PaginationProps) {
 if (totalPages <= 1) return null;
    return (
    <ReactPaginate
pageCount={totalPages}
pageRangeDisplayed={5}
marginPagesDisplayed={1}
onPageChange={onPageChange}
forcePage={page - 1}
containerClassName={css.pagination}
activeClassName={css.active}
nextLabel="→"
previousLabel="←"

    />
  );
}

"use client";
import ReactPaginate from "react-paginate";
//import type { ReactPaginateProps } from "react-paginate";
//import type { ComponentType } from "react";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

/*const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;*/


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

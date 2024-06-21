import type { GetProp, TableProps } from 'antd';

export type ColumnsType<TStudentsList> = TableProps<TStudentsList>['columns'];

export type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;

export type TableParams = {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<NonNullable<TablePaginationConfig['onChange']>>[1];
}


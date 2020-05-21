export interface IPagination {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export type IResult<T> = T extends Array<infer U>
  ? { data: T } & IPagination
  : { data: T };

export interface IResponse<T> {
  code: number;
  result: IResult<T>;
}

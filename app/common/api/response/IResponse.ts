export interface IResponse<T extends {}> {
  code: number;
  result: {
    data: T;
  };
}

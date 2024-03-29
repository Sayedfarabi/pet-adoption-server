type IOptions = {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortOrder: string;
  sortBy: string;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (Number(page) - 1) * limit;

  const sortOrder: string = options.sortOrder || "desc";
  const sortBy: string = options.sortBy || "createdAt";

  return {
    page,
    limit,
    skip,
    sortOrder,
    sortBy,
  };
};

export const paginationHelper = {
  calculatePagination,
};

export type TPetsFilterRequest = {
  species?: string | undefined;
  breed?: string | undefined;
  searchTerm?: string | undefined;
  location?: string | undefined;
  age?: string | number | undefined;
  size?: string | undefined;
};

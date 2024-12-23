export interface BooklistReducer {
  books: Array<{ id: string }>;
  cart: Array<string>;
  bookError: string;
  cartError: string;
  booksLoading: boolean;
  cartLoading: boolean;
}

export interface LoginPayload {
  username: string;
  password: string;
}

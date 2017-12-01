export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  data: T;
  message?: string;
}

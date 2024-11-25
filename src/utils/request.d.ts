declare module '@/utils/request' {
  import { AxiosRequestConfig } from 'axios';

  export function request(config: AxiosRequestConfig): Promise<any>;
}

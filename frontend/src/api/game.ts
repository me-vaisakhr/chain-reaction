import httpService from "./httpService";
import { AxiosResponse } from "axios";

export function createRoom(): Promise<AxiosResponse<{ roomId: string }>> {
  return httpService.get(`/create`);
}

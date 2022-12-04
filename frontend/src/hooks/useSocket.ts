import { useEffect, useRef } from "react";
import io, { ManagerOptions, SocketOptions } from "socket.io-client";

export const useSocket = (
  uri: string,
  opt?: Partial<ManagerOptions & SocketOptions> | undefined
) => {
  const { current: socket } = useRef(io(uri, opt));
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);
  return socket;
};

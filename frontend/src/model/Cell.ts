import React from "react";
import { Player } from "./Player";
export interface Cell {
  index: number;
  bombCount: number;
  player?: Player;
}

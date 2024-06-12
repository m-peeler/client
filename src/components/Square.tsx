import React from "react";
import { RecursiveBoard } from "./Board";

export default function Square(props: {depth: number, column: number, row: number}) {
    const {depth, row, column} = props;
    return (
        <div className={`square depth-${depth} row-${row} column-${column}`}>
            {depth > 0 ? 
             <RecursiveBoard depth={depth - 1} />
             : ""
            }
        </div>
    )
}
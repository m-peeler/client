import React from "react";
import Square from "./Square";
import "./Board.css";

export function RecursiveBoard(props: {depth: number}) {
    const {depth} = props;

    return (
        <div className="board" style={{'--depth': depth} as React.CSSProperties}>
            {[0,1,2].map(
                (_, i) => 
                    <div className={`rows row-${i} depth-${depth}`} style={{'--row-ind': i, "--depth": depth, flexDirection: 'row'} as React.CSSProperties}>
                        {[0,1,2].map(
                            (_, j) => 
                                <Square depth={depth} column={i} row={j} />
                        )}
                    </div>
            )}
        </div>
    )
}

export default function Board(props : {depth? : number}) {
    const {depth} = props;
    return (
        <div className="boardRoot" style={{'--game-depth': depth} as React.CSSProperties}>
            <RecursiveBoard depth={depth !== undefined ? depth : 0} />
        </div>
    )
}
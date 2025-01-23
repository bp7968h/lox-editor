import React from "react";
import { Line } from "./Editor";

type LineCodeProps = {
    code: Line['code'],
}

const LineCode: React.FC<LineCodeProps> = ({ code }) => {
    return (
        <span>
            {code}
        </span>
    )
}

export default LineCode;
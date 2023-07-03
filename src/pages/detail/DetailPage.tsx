import React from "react";
import { useParams } from "react-router-dom";

type Matchparams = {
    touristRouteId: string;
    other: string;
}

export const DetailPage: React.FC = () => {
    let params = useParams<Matchparams>();
    return (
        <h1>旅游路线详情页, 路线id: { params.touristRouteId } {params.other}</h1>
    )
}
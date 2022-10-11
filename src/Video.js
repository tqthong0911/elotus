import React, { useState } from "react";
import { getVideoById } from "./api";

export default function Video({ id, title, poster_path, setError }) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});

  const handleShowDetail = async () => {
    setLoading(true);
    const { success, data, error } = await getVideoById(id);
    
    if (!success) {
      setError(error);
    } else {
      setDetail(data);
    }

    setLoading(false);
  };

  return (
    <div key={id}>
      <div onClick={handleShowDetail}>
        <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={poster_path} />
      </div>
      <div>{title}</div>
      <div className={loading && "loader-line"}>
        {JSON.stringify(detail?.production_countries || '') }
      </div>
    </div>
  );
}

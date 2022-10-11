import { useCallback, useEffect, useState } from "react";
import { parseUrl } from "query-string";
import Video from "./Video";
import { getSession, getToken, getVideos } from "./api";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videos, setVideos] = useState([]);

  const fetchVideos = useCallback(async () => {
    setVideos([]);
    setLoading(true);
    const { data, success, error } = await getVideos();
    success ? setVideos(data.results) : setError(error);
    setLoading(false);
  }, []);

  const init = useCallback(async () => {
    const {
      query: { request_token, approved },
    } = parseUrl(window.location.href);

    const session_id = localStorage.getItem("session_id") || "";

    if (request_token && approved) {
      if (session_id) {
        fetchVideos();
        return;
      }

      const { success, data, error } = await getSession(request_token);
      success
        ? localStorage.setItem("session_id", data.session_id)
        : setError(error);

      return;
    }

    const { success, data, error } = await getToken();
    if (success) {
      localStorage.setItem("token", data.request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://127.0.0.1:3000`;
    }

    setError(error);
  }, [fetchVideos]);

  useEffect(() => {
    init();
  }, [init]);


  return (
    <div className={loading && "loading"}>
      <div style={{ color: "red" }}>{error}</div>
      <button onClick={fetchVideos}>Refresh videos</button>

      <div className="list">
        {videos.map(({ id, poster_path, title }) => (
          <Video
            key={id}
            id={id}
            poster_path={poster_path}
            title={title}
            setError={setError}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

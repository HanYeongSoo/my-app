import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  const getMovies = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovie(json.data.movie);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {/* movie가 로드될 때까지 null을 처리해 줘야 함 */}
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.large_cover_image} />
          {/* movie.genres가 배열일 경우 각 항목을 map으로 표시 */}
          {movie.genres && (
            <ul>
              {movie.genres.map((genre, index) => (
                <li key={index}>{genre}</li> // 각 장르를 리스트 아이템으로 출력
              ))}
            </ul>
          )}
          {/* 필요한 영화 세부 정보 표시 */}
        </div>
      ) : (
        <h1>Loading...</h1> // 데이터 로딩 중일 때 표시
      )}
    </div>
  );
}

export default Detail;

import { useEffect, useState } from "react";
import Card from "./Card";
import Navigation from "./Navigation";


const Home = () => {
    const [cardWidth, setCardWidth] = useState(500);
    const cardsInRow = 5;
    const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardsInRow);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovie = async () => {
            const url = 'https://tvshow.p.rapidapi.com/Movie/NowPlaying?Page=1&Language=en-US&Adult=true';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'bbb670fbe7msh06e0ff277b81e75p1203c3jsnbdb467292e56',
                    'x-rapidapi-host': 'tvshow.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json(); 
                console.log("Fetched Movies:", data);
                
                
                setMovies(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch movies.");
            }
        };

        getMovie();
    }, []);

    return (
      <>

      <Navigation />
        <div className='flex justify-center items-center' style={{ width: wrapperWidth }} >
            <div className="flex flex-wrap">
                {movies.length > 0 ? (
                    movies.map((movie, i) => ( 
                        <div key={i}>
                            <Card cardWidth={cardWidth} movie={movie} />
                        </div>
                    ))
                ) : (
                    <p>Loading movies...</p> 
                )}
            </div>
        </div>
      </>
    );
};

export default Home;

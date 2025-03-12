import { useEffect, useState } from "react";
import Card from "./Card";
import Navigation from "./Navigation";


const Home = () => {
    const [cardWidth, setCardWidth] = useState(500);
    const cardsInRow = 5;
    const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardsInRow);
    const [movies, setMovies] = useState([]);
    const [page,setPage] = useState(1)
    const [group,setgroup] = useState('Popular') 

    const apiKey = import.meta.env.VITE_API_KEY 
    const baseUrl = import.meta.env.VITE_BASE_URL 

    useEffect(() => {
        const getMovie = async () => {
            const url = `${baseUrl}/${group}?Page=${page}&Language=en-US&Adult=true`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKey,
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
    }, [group,page]);

    return (
      <>

      <Navigation page={page} setPage={setPage} setgroup={setgroup} />
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

import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import Navigation from "./Navigation";
import { useMotionValue, useTransform,motion, useSpring } from "framer-motion";


const Home = () => {
    const [cardWidth, setCardWidth] = useState(500);
    const cardsInRow = 5;
    const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardsInRow);
    const [movies, setMovies] = useState([]);
    const [page,setPage] = useState(1)
    const [group,setgroup] = useState('Popular');
    const [mousePos,setMousePos] = useState({
        left:0,
        top:0,
        width:0,
        height:0
    })

    const [windowWidth,setWindowWidth] = useState(window.innerWidth)
    const [windowHeight,setWindowHeight] = useState(window.innerHeight)

    const cardRef = useRef(null); 

    const getMousePos = (e,refEle) =>{
        const position ={
            x:e.clientX,
            y:e.clientY,
        }

        const offset = {
            left:position.x,
            top:position.y,
            width:refEle.clientWidth,
            height:refEle.clientHeight
        }

        setMousePos(offset)
        console.log(mousePos)
    }

    const x = useMotionValue(0)
    const y = useMotionValue(0);
    x.set(mousePos.left)
    y.set(mousePos.top);

    const xSpring =useSpring(x,{stiffness:10,damping:10})
    const ySpring =useSpring(y,{stiffness:10,damping:10})

    const translateX = useTransform(xSpring,[0,windowWidth],[0,-mousePos.width + windowWidth])
    const translateY = useTransform(ySpring,[0,windowHeight],[0,-mousePos.height + windowHeight])

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
                console.log('Fetching movies')
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

    window.addEventListener('resize',() => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    })

    return (
      <>

      <Navigation page={page} setPage={setPage} setgroup={setgroup} />
        <motion.div 
            className='flex justify-center items-center fixed top-0 left-0 overflow-hidden' 
            style={{ width: wrapperWidth,translateX,translateY }} 
            ref={cardRef}
            onMouseMove={(e) => getMousePos(e,cardRef.current)}
            
            >
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
        </motion.div>
      </>
    );
};

export default Home;

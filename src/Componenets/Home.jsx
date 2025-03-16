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
    




    const [loading,setLoading] = useState(false)

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

    const abortControllerRef = useRef(null);

    useEffect(() => {
        abortControllerRef.current != null && abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController()
        const getMovie = async () => {
            const url = `${baseUrl}/${group}?Page=${page}&Language=en-US&Adult=true`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'tvshow.p.rapidapi.com'
                },
                signal: abortControllerRef.current != null && abortControllerRef.current.signal
            };

            try {
                setLoading(true);
                const response = await fetch(url, options);
                const data = await response.json(); 
                console.log("Fetched Movies:", data);
                
                
                setMovies(Array.isArray(data) ? data : []);
            } catch (error) {
                if(error,name === 'AbortError'){
                    console.log('Aborted')
                    return
                }

                console.error(error);
                alert(error);
            }finally{
                setLoading(false)
            }
        };

        getMovie();
    }, [group,page]);

    useEffect(() =>{
        const handleResize = () =>{
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)

            let newCardWidth = 500
            if(window.innerWidth < 1280 ){
                newCardWidth = 400
            }
            if(window.innerWidth < 766 ){
                newCardWidth = 360
            }

            setCardWidth(newCardWidth)
            setWrapperWidth(newCardWidth * cardsInRow)

            x.set(mousePos.left)
            y.set(mousePos.top)
        }

        window.addEventListener('resize',handleResize)
        handleResize()

        return () =>  window.removeEventListener('resize',handleResize)
    },[])

    useEffect( () =>{
        x.set(0)
        y.set(0)
    },[windowHeight,windowWidth])





    return (
      <>

      <Navigation page={page} setPage={setPage} setgroup={setgroup} />

       { loading === true ?
        <div className="h-screen w-screen flex justify-center items-center ">
            <h1 className="text-white text-4xl uppercase "> Loading.....</h1>
           </div>
       
            :
        <motion.div 
            className='flex justify-center items-center fixed top-0 left-0 overflow-hidden' 
            style={{ width: wrapperWidth,translateX,translateY }} 
            ref={cardRef}
            onMouseMove={(e) => getMousePos(e,cardRef.current)}
            
            >
            <div className="flex flex-wrap">
                {
                    movies.map((movie, i) => ( 
                        <motion.div 
                             initial={{opacity:0}}
                             animate={{opacity:1}}
                             transition={{delay:i*0.05}}
                             key={i}>

                            <Card cardWidth={cardWidth} movie={movie} />
                        </motion.div>
                    
                ) 
                )}
            </div>
        </motion.div>
}
      </>
    );
};

export default Home;


import React, {useState} from "react"

export default function Meme(){
    
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage:'https://i.imgflip.com/1g8my4.jpg'
    })

    const [allMemes, setAllMemes] = useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])

    function getMemeImg(){
        const randomNumber = Math.floor(Math.random()*allMemes.length)
        const url = allMemes[randomNumber].url
       setMeme(prevState=>({...prevState, randomImage: url}))
    }

    function handleChange(event){
        const {name, value} = event.target

        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return(
        <section>
            <div className="form">
                <div className="form--input-group">
                <input 
                    type="text"
                    placeholder="top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                    />
                   
                <input 
                    type="text"
                    placeholder="bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                    />
                </div>
                <button onClick={getMemeImg} className="form--button">Get a new meme image  🖼</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="random meme image" className="meme--image"/>
                 <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            
        </section>
    )
}
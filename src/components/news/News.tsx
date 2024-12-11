import { useState } from "react";
import { INews, IArticles } from '../../../interfaces/INews';
import "./News.css"

const News: React.FC = () => {
    const API_KEY = import.meta.env.VITE_KEY_API;
    const [newText, setNewText] = useState<string>("")
    const [language, setLanguage] = useState<string>("")
    const [newData, setNewData] = useState<null | INews>(null)

    const getNewText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewText(event.target.value.trim().toLocaleLowerCase().replace(" ", ""))
    }

    const getLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value)
    };

    const fetchNews = () => {
        if (!newText || !language) return

        fetch(`http://newsapi.org/v2/everything?q=${newText}&language=${language}&apiKey=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                setNewData(data)
            })
            .catch((err) => {
                if (err.message.includes("rateLimited")) {
                    console.error("Too many requests. Please try again later.");
                } else {
                    console.error("Error fetching data:", err);
                }
            })
    }


    return (
        <>
            <h1>Breaking News</h1>
            <div className="input">
                <input type="text" placeholder="Type to search..." onChange={getNewText} />
                <select name="language" onChange={getLanguage}>
                    <option value="">Select your language</option>
                    <option value="ar">Arabic</option>
                    <option value="de">German</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="he">Hebrew</option>
                    <option value="it">Italian</option>
                    <option value="nl">Dutch</option>
                    <option value="no">Norwegian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="sv">Swedish</option>
                    <option value="ur">Urdu</option>
                    <option value="zh">Chinese</option>
                </select>
                <button onClick={fetchNews}>Search</button>
            </div>
            <hr />
            <section className="news">
                {newData && newData.articles && newData.articles.length > 0 ? (
                    newData.articles.map((newArticle: IArticles, index: number) => (
                        <div key={index} className="newCard">
                            <h2>{newArticle.title}</h2>
                            {newArticle.urlToImage && (
                                <img src={newArticle.urlToImage} alt="" />
                            )}
                            <p>{newArticle.description}</p>
                            <a href="#">Read more</a>
                            <hr />
                        </div>
                    ))
                ) : (<p>No news found. Try searching!</p>

                )}
            </section>
        </>
    );
}

export default News;
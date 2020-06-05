import React, { useState, useEffect } from 'react';
import '../style/News.css';
import Static from '../services/Static';

function News() {

    var [news, setNews] = useState([]);
    var [currentNews, setCurrentNews] = useState('');

    const [tittle, setTittle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        fetchNews();
        getVisits();
    }, []);

    function onAddNews() {
        document.getElementById('newsTittle').style.display = "none";
        document.getElementById('newsDescription').style.display = "none";
        document.getElementById('newsBodytext').style.display = "none";
        document.getElementById('btnNext').style.display = "none";
        document.getElementById('btnPerv').style.display = "none";
        document.getElementById('btnMore').style.display = "none";
        document.getElementById('btnLess').style.display = "none";
        document.getElementById('btnAddNews').style.display = "none";

        document.getElementById('addTittle').style.display = "initial";
        document.getElementById('addDescription').style.display = "block";
        document.getElementById('addBody').style.display = "initial";
        document.getElementById('btnSubmit').style.display = "initial";
        document.getElementById('addTittleText').style.display = "block";
        document.getElementById('addDescriptionText').style.display = "block";
        document.getElementById('addBodyText').style.display = "block";
    }

    const onSubmit = async () => {
        if (tittle.length > 0 && description.length > 0 && body.length > 0) {
            var news = {
                'NewsTittle': tittle,
                'NewsDescription': description,
                'NewsBody': body,
                'UserId': Static.getUser().id
            };

            var link = Static.getServerLink() + 'api/AddNews';

            await fetch(link, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:57703/',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/',
                    'Access-Control-Allow-Credentials': 'true',
                },
                body: JSON.stringify(
                    news
                )
            }).then(window.location.reload());
        }
        else
            alert("All fields must be filled");

    }

    const fetchNews = async () => {
        var link = Static.getServerLink() + 'api/GetNews';

        await fetch(link).then(response => response.json()).then(
            response => setNews(response) & initNews(response)
        );

    }

    const getVisits = async () => {
        var link = Static.getServerLink() + 'api/GetVisits';

        await fetch(link).then(response => response.json()).then(
            response => showVisits(response)
        );
    }

    function showVisits(visits) {
        if (document.getElementById('visits') !== null)
            document.getElementById('visits').innerHTML = visits + ' page visits';
    }

    function initNews(news) {
        if (document.getElementById('pageNm') !== null && news.length>0) {
            var lastNews = Object.keys(news).length - 1;
            setCurrentNews(lastNews + '');
            document.getElementById('pageNm').innerHTML = Object.keys(news).length + '/' + Object.keys(news).length;
            document.getElementById('newsTittle').innerHTML = news[lastNews].newsTittle;
            document.getElementById('newsDescription').innerHTML = news[lastNews].newsDescription;
            document.getElementById('newsBodytext').innerHTML = news[lastNews].newsBody;
        } else {
            document.getElementById('newsTittle').innerHTML = 'Now news to show!';
            document.getElementById('btnNext').style.display = "none";
            document.getElementById('btnPerv').style.display = "none";
            document.getElementById('btnMore').style.display = "none";
            document.getElementById('btnLess').style.display = "none";
        }
    }

    function more() {
        document.getElementById('newsDescription').style.display = "none";
        document.getElementById('btnMore').style.display = "none";
        document.getElementById('newsBodytext').style.display = "block";
        document.getElementById('btnLess').style.display = "initial";
        setCurrentNews(currentNews);
    }

    function less() {
        document.getElementById('newsDescription').style.display = "block";
        document.getElementById('btnMore').style.display = "initial";
        document.getElementById('newsBodytext').style.display = "none";
        document.getElementById('btnLess').style.display = "none";
    }

    function showPervNextNews(perv) {
        less();
        console.log(currentNews);

        if (perv) {
            if (currentNews > 0) {
                --currentNews;

                document.getElementById('pageNm').innerHTML = currentNews + 1 + '/' + news.length;
                document.getElementById('newsTittle').innerHTML = news[currentNews].newsTittle;
                document.getElementById('newsDescription').innerHTML = news[currentNews].newsDescription;
                document.getElementById('newsBodytext').innerHTML = news[currentNews].newsBody;
            }
        } else {
            if (currentNews + 1 < news.length) {
                currentNews++;

                document.getElementById('pageNm').innerHTML = currentNews + 1 + '/' + news.length;
                document.getElementById('newsTittle').innerHTML = news[currentNews].newsTittle;
                document.getElementById('newsDescription').innerHTML = news[currentNews].newsDescription;
                document.getElementById('newsBodytext').innerHTML = news[currentNews].newsBody;
            }
        }
    }

    return (
        <div className='NewsDiv'>
            <div className='News'>
                <div>
                    <div className="container">
                        {
                            Static.checkPermision(
                                "AddNews",
                                <div>
                                    <h4 id='addTittleText' style={{ display: "none" }}>Tittle</h4>
                                    <textarea id='addTittle' style={{ display: "none" }} onChange={event => setTittle(event.target.value)}></textarea>
                                    <h4 id='addDescriptionText' style={{ display: "none" }}>Description</h4>
                                    <textarea id='addDescription' style={{ display: "none" }} onChange={event => setDescription(event.target.value)}></textarea>
                                    <h4 id='addBodyText' style={{ display: "none" }}> Full news</h4>
                                    <textarea id='addBody' style={{ display: "none" }} onChange={event => setBody(event.target.value)}></textarea>
                                    <button id='btnSubmit' style={{ display: "none" }} className='btn btn-sm btn-warning'
                                        onClick={e => onSubmit()}>Submit</button>
                                </div>
                            )
                        }

                        <h1 id='newsTittle' className="jumbotron-heading"></h1>
                        <p id='newsDescription' className="lead text-muted"></p>
                        <p id='newsBodytext' style={{ display: "none" }} className="lead text-muted"></p>
                        <a id='btnMore' href="#" className="btn btn-sm btn-primary" onClick={e => more()}>More..</a>
                        <a id='btnLess' style={{ display: "none" }} href="#" className="btn btn-sm btn-primary" onClick={e => less()}>Less..</a>
                        <div id='divBtnNextPerv'>
                            <a id='btnPerv' className="btn btn-primary" onClick={e => showPervNextNews(true)}>Previous</a>
                            <a id='btnNext' className="btn btn-secondary" onClick={e => showPervNextNews(false)}>Next</a>
                        </div>
                        <h6 id='pageNm'></h6>
                    </div>
                    <div className='col'>
                        <img id='newsImg'></img>
                    </div>
                    {
                        Static.checkPermision(
                            "AddNews",
                            <button id='btnAddNews' className='btn btn-success'
                                onClick={e => onAddNews()}>Add news</button>
                        )
                    }
                    <p id='visits'> page visits</p>
                </div>
            </div>
        </div>
    );
}

export default News;

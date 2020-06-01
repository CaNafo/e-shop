import React from 'react';
import '../style/News.css';
import Search from '../icons/search.png'

function News() {

    return (
        <div className='NewsDiv'>
            <div className='News'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div>
                                <h1 id='newsTittle'>Tittle of the news</h1>

                                <p>"The breathing techniques required to play these instruments for a few hours put you in a kind of trance," says Miguel Cordoba, who plays the siku flute.

                                But as soon as the rehearsal finishes they are all too aware of how their life has changed. Because they are not rehearsing back home in La Paz, Bolivia, but in the shadow of a German castle where they have been stranded for 73 days.

                                The musicians, most of whom have never left Bolivia before, were expecting to spend just over a fortnight this spring touring east Germany's concert halls.

Instead they are holed up in the buildings and grounds of the sprawling estate of Rheinsberg Palace, a moated castle which has been home to generations of German royalty and aristocracy, an hour and a half's drive northwest of Berlin.</p>

                            </div>
                        </div>
                        <div className='col'>
                            <img src={Search} id='newsImg'></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;

import React from 'react';
import '../style/News.css';
import Search from '../icons/search.png'

function News() {

    return (
        <div className='NewsDiv'>
            <div className='News'>
                
                   
                        
                            <div>
                               <br></br>
                                     <section class="newsbody text-center">
                                        <div class="container">
                                            <h1 class="jumbotron-heading">News</h1>
                                            <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
                                            <p>
                                            <a href="#" class="btn btn-primary">Previous</a>
                                            <a href="#" class="btn btn-secondary">Next</a>
                                            </p>
                                        </div>
                                        </section>

                            </div>
                        
                        <div className='col'>
                            <img id='newsImg'></img>
                        </div>
                   
                
            </div>
        </div>
    );
}

export default News;

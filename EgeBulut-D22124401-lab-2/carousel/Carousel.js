import React from 'react';
import "./App.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import img1 from './images/cs1.jpg'
import img2 from './images/cs2.jpg'
import img3 from './images/cs3.jpg'
import img4 from './images/cs4.jpg'

function App() {
    return (
        <div className="App">
            <Carousel>
                <div>
                    <img src={img1} />
                    <p className="img">Image 1</p>
                </div>
                <div>
                    <img src={img2} />
                    <p className="img">Image 2</p>
                </div>
                <div>
                    <img src={img3} />
                    <p className="img">Image 3</p>
                </div>
                <div>
                    <img src={img4} />
                    <p className="img">Image 4</p>
                </div>
            </Carousel>
        </div>
    );
};

export default App;
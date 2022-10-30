import { useState } from 'react';
import './styles.css';

const DisplayReviewImages = ({ imgArray }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <div id={!clicked ? 'review-images-container' : 'hide-review-images-container'} onClick={() => setClicked(clicked => !clicked)}>
            {imgArray.map((img, i) => {
                return  <div>
                            <img className='review-images' src={img.url} key={i}></img>
                        </div>
            })}
        </div>
    );
};

export default DisplayReviewImages;
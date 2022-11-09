import { useState } from 'react';

import './styles.css';

const DisplayReviewImages = ({ imgArray, clicked, imgCount }) => {
    const [imgIndex, setImgIndex] = useState(Number(0));
    
    let url;
    if (imgArray[imgIndex] && imgArray[imgIndex].url) url = imgArray[imgIndex].url;
    
    return (
        <div id={clicked ? 'review-images-container' : 'hide-review-images-container'}>
            <img className='review-images' src={url}></img>
            {
                imgCount > 1 &&
                <div id='iterate-review-images-div'>
                    <button className='review-images-iterator' onClick={e => {
                        e.stopPropagation();

                        if (imgIndex > 0) setImgIndex(imgIndex - 1);
                    }}>...Previous</button>
                    <button className='review-images-iterator' onClick={e => {
                        e.stopPropagation();

                        if (imgIndex < (imgCount - 1)) setImgIndex(imgIndex + 1);
                    }}>...Next</button>
                </div>
            }
        </div>
    );
};

export default DisplayReviewImages;
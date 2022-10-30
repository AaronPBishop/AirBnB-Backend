import './styles.css';

const DisplayReviewImages = ({ imgArray, clicked }) => {
    return (
        <div id={clicked ? 'review-images-container' : 'hide-review-images-container'}>
            {imgArray.map((img, i) => {
                return  <div>
                            <img className='review-images' src={img.url} key={i}></img>
                        </div>
            })}
        </div>
    );
};

export default DisplayReviewImages;
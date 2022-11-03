const SpotImages = (imgArr) => {
    let images;
    if (imgArr.imgArr && imgArr.imgArr.length > 0) images = imgArr.imgArr;

    if (images === undefined || images.length === 0) return (<p style={{fontStyle: 'italic'}}>No images to display</p>)
    return (
        <div>

            {
                images.length > 1 && images.length < 5 ? 

                images.map((img, i) => <img src={img.url} id='spot-images' key={i}></img>)

                : images.length === 1 ?

                <img src={images[0].url} id='spot-images'></img>

                : images.length > 4 &&

                <div>
                    <img src={images[0].url} id='main-spot-img'></img>

                    <div id='many-spot-images-container'>
                        {images.map((img, i) => i > 0 && i < 5 && <img src={img.url} className='many-spot-images' key={i}></img>)}
                    </div>
                </div>
            }

        </div>
    );
};

export default SpotImages;
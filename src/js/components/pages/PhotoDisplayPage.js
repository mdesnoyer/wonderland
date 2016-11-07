import React, { Component, PropTypes } from 'react';

import ImageGallery from 'react-image-gallery';

import { PercentileContainer } from './../photo-page-components/PhotoContainers';

import BasePage from './BasePage';
import T from '../../modules/translation';

const photos = [
    {
        "original": "https://a0.muscache.com/im/pictures/d49c6ec1-41aa-49cc-82c2-2f67486446bd.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/d49c6ec1-41aa-49cc-82c2-2f67486446bd.jpg?aki_policy=medium",
        "photoId": 116640874,
        "score": 12,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/6264d3f6-890b-4f83-b8cd-33dbdb758a87.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/6264d3f6-890b-4f83-b8cd-33dbdb758a87.jpg?aki_policy=medium",
        "photoId": 102064341,
        "score": 9,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/e5252be4-dff0-497c-ab28-8a3f9f9c92b7.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/e5252be4-dff0-497c-ab28-8a3f9f9c92b7.jpg?aki_policy=medium",
        "photoId": 219965032,
        "score": 12,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/44c28dad-f65f-4c4f-9f25-1019db7fe168.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/44c28dad-f65f-4c4f-9f25-1019db7fe168.jpg?aki_policy=medium",
        "photoId": 209972699,
        "score": 25
    },
    {
        "original": "https://a0.muscache.com/im/pictures/412a6a24-37c6-487d-a9ea-af8781680fd5.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/412a6a24-37c6-487d-a9ea-af8781680fd5.jpg?aki_policy=medium",
        "photoId": 213018669,
        "score": 12
    },
    {
        "original": "https://a0.muscache.com/im/pictures/d3b08eb6-f1b7-4329-be28-0550fac179de.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/d3b08eb6-f1b7-4329-be28-0550fac179de.jpg?aki_policy=medium",
        "photoId": 210105519,
        "score": 7
    },
    {
        "original": "https://a0.muscache.com/im/pictures/c5526500-8689-49a5-9beb-f58713b746ec.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/c5526500-8689-49a5-9beb-f58713b746ec.jpg?aki_policy=medium",
        "photoId": 164323545,
        "score": 23
    },
    {
        "original": "https://a0.muscache.com/im/pictures/b966f039-cf40-469f-b64c-85374a1df706.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/b966f039-cf40-469f-b64c-85374a1df706.jpg?aki_policy=medium",
        "photoId": 144512489,
        "score": 11
    },
    {
        "original": "https://a0.muscache.com/im/pictures/d49c6ec1-41aa-49cc-82c2-2f67486446bd.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/d49c6ec1-41aa-49cc-82c2-2f67486446bd.jpg?aki_policy=medium",
        "photoId": 116640874,
        "score": 12,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/6264d3f6-890b-4f83-b8cd-33dbdb758a87.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/6264d3f6-890b-4f83-b8cd-33dbdb758a87.jpg?aki_policy=medium",
        "photoId": 102064341,
        "score": 9,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/e5252be4-dff0-497c-ab28-8a3f9f9c92b7.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/e5252be4-dff0-497c-ab28-8a3f9f9c92b7.jpg?aki_policy=medium",
        "photoId": 219965032,
        "score": 12,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/44c28dad-f65f-4c4f-9f25-1019db7fe168.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/44c28dad-f65f-4c4f-9f25-1019db7fe168.jpg?aki_policy=medium",
        "photoId": 209972699,
        "score": 25
    },
    {
        "original": "https://a0.muscache.com/im/pictures/412a6a24-37c6-487d-a9ea-af8781680fd5.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/412a6a24-37c6-487d-a9ea-af8781680fd5.jpg?aki_policy=medium",
        "photoId": 213018669,
        "score": 12
    },
    {
        "original": "https://a0.muscache.com/im/pictures/d3b08eb6-f1b7-4329-be28-0550fac179de.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/d3b08eb6-f1b7-4329-be28-0550fac179de.jpg?aki_policy=medium",
        "photoId": 210105519,
        "score": 7
    },
    {
        "original": "https://a0.muscache.com/im/pictures/c5526500-8689-49a5-9beb-f58713b746ec.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/c5526500-8689-49a5-9beb-f58713b746ec.jpg?aki_policy=medium",
        "photoId": 164323545,
        "score": 23
    },
    {
        "original": "https://a0.muscache.com/im/pictures/b966f039-cf40-469f-b64c-85374a1df706.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/b966f039-cf40-469f-b64c-85374a1df706.jpg?aki_policy=medium",
        "photoId": 144512489,
        "score": 11
    },
    {
        "original": "https://a0.muscache.com/im/pictures/d49c6ec1-41aa-49cc-82c2-2f67486446bd.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/d49c6ec1-41aa-49cc-82c2-2f67486446bd.jpg?aki_policy=medium",
        "photoId": 116640874,
        "score": 12,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/6264d3f6-890b-4f83-b8cd-33dbdb758a87.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/6264d3f6-890b-4f83-b8cd-33dbdb758a87.jpg?aki_policy=medium",
        "photoId": 102064341,
        "score": 9,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/e5252be4-dff0-497c-ab28-8a3f9f9c92b7.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/e5252be4-dff0-497c-ab28-8a3f9f9c92b7.jpg?aki_policy=medium",
        "photoId": 219965032,
        "score": 12,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/44c28dad-f65f-4c4f-9f25-1019db7fe168.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/44c28dad-f65f-4c4f-9f25-1019db7fe168.jpg?aki_policy=medium",
        "photoId": 209972699,
        "score": 25
    },
    {
        "original": "https://a0.muscache.com/im/pictures/412a6a24-37c6-487d-a9ea-af8781680fd5.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/412a6a24-37c6-487d-a9ea-af8781680fd5.jpg?aki_policy=medium",
        "photoId": 213018669,
        "score": 12
    },
    {
        "original": "https://a0.muscache.com/im/pictures/d3b08eb6-f1b7-4329-be28-0550fac179de.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/d3b08eb6-f1b7-4329-be28-0550fac179de.jpg?aki_policy=medium",
        "photoId": 210105519,
        "score": 7
    },
    {
        "original": "https://a0.muscache.com/im/pictures/c5526500-8689-49a5-9beb-f58713b746ec.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/c5526500-8689-49a5-9beb-f58713b746ec.jpg?aki_policy=medium",
        "photoId": 164323545,
        "score": 23
    },
    {
        "original": "https://a0.muscache.com/im/pictures/b966f039-cf40-469f-b64c-85374a1df706.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/b966f039-cf40-469f-b64c-85374a1df706.jpg?aki_policy=medium",
        "photoId": 144512489,
        "score": 11
    },
    {
        "original": "https://a0.muscache.com/im/pictures/d49c6ec1-41aa-49cc-82c2-2f67486446bd.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/d49c6ec1-41aa-49cc-82c2-2f67486446bd.jpg?aki_policy=medium",
        "photoId": 116640874,
        "score": 12,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/6264d3f6-890b-4f83-b8cd-33dbdb758a87.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/6264d3f6-890b-4f83-b8cd-33dbdb758a87.jpg?aki_policy=medium",
        "photoId": 102064341,
        "score": 9,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/e5252be4-dff0-497c-ab28-8a3f9f9c92b7.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/e5252be4-dff0-497c-ab28-8a3f9f9c92b7.jpg?aki_policy=medium",
        "photoId": 219965032,
        "score": 12,
    },
    {
        "original": "https://a0.muscache.com/im/pictures/44c28dad-f65f-4c4f-9f25-1019db7fe168.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/44c28dad-f65f-4c4f-9f25-1019db7fe168.jpg?aki_policy=medium",
        "photoId": 209972699,
        "score": 25
    },
    {
        "original": "https://a0.muscache.com/im/pictures/412a6a24-37c6-487d-a9ea-af8781680fd5.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/412a6a24-37c6-487d-a9ea-af8781680fd5.jpg?aki_policy=medium",
        "photoId": 213018669,
        "score": 12
    },
    {
        "original": "https://a0.muscache.com/im/pictures/d3b08eb6-f1b7-4329-be28-0550fac179de.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/d3b08eb6-f1b7-4329-be28-0550fac179de.jpg?aki_policy=medium",
        "photoId": 210105519,
        "score": 7
    },
    {
        "original": "https://a0.muscache.com/im/pictures/c5526500-8689-49a5-9beb-f58713b746ec.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/c5526500-8689-49a5-9beb-f58713b746ec.jpg?aki_policy=medium",
        "photoId": 164323545,
        "score": 23
    },
    {
        "original": "https://a0.muscache.com/im/pictures/b966f039-cf40-469f-b64c-85374a1df706.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/b966f039-cf40-469f-b64c-85374a1df706.jpg?aki_policy=medium",
        "photoId": 144512489,
        "score": 11
    },
    {
        "original": "https://a0.muscache.com/im/pictures/83e89a3a-6819-48ee-9fb4-77eccc4f6923.jpg?aki_policy=x_large",
        "thumbnail": "https://a0.muscache.com/im/pictures/83e89a3a-6819-48ee-9fb4-77eccc4f6923.jpg?aki_policy=medium",
        "photoId": 144511954,
        "score": 6
    }
];

class PhotoDisplayPage extends Component {

    getPhotoUrls() {
        return photos.map((photo) => {
            return <img src={photo.thumbnail}/>;
        });
    }

    handlePercentileClick(e) {
        e.preventDefault();
        alert(e.target.dataset.percentile);
    }


    render() {
        const imageGalleryOptions = {
            showNav: false,
            showPlayButton: false,
            showFullscreenButton: false,
        };

        return (
            <div>
                <PercentileContainer handlePercentileClick={this.handlePercentileClick}/>
            </div>
        );

    }
}

export default PhotoDisplayPage;





        // return (
        //     <div>
        //     <PercentileContainer  />
        //         <h1>90th Percentile</h1>
        //         <section className="photoSection">
        //             {this.getPhotoUrls()}
        //         </section>
        //         <h1>80th Percentile</h1>
        //         <section className="photoSection">
        //             {this.getPhotoUrls()}
        //         </section>
        //         <h1>70th Percentile</h1>
        //         <section className="photoSection">
        //             {this.getPhotoUrls()}
        //         </section>
        //     </div>
        // );

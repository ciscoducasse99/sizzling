import React from "react";

import "./reviews.scss";

const Reviews = () => {
  const fakeReviews = [
    {
      userName: "John Doe",
      rating: 4,
      image:
        "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg",
      review:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
      date: "Jan 22",
    },
    {
      userName: "Lamona Hills",
      rating: 5,
      image:
        "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg",
      review: `Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus`,
      date: "Jan 12",
    },
    {
      userName: "Murphy Cooper",
      rating: 4,
      image:
        "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg",
      review:
        "senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. ",
      date: "Dec 02",
    },
    {
      userName: "Lana Williams",
      rating: 5,
      image:
        "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg",
      review:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
      date: "Mar 15",
    },
    {
      userName: "Anonymous",
      rating: 5,
      image:
        "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg",
      review:
        "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.",
      date: "Mar 31",
    },
  ];
  return (
    <div id="modal-reviews" className="bg-white pb-0 mb-0">
      <div className="container py-2">
        <h4 className="py-3">Reviews</h4>
        <div className="mb-3">
          {fakeReviews.map(review =>(
          <div key={review.userName} className="media border border-left-0 border-right-0 border-top-0 px-3 mb-1">
            <img
              src={review.image}
              alt={review.userName}
              className="mr-3 mt-3 rounded-circle  align-self-start"
              style={{ width: "60px", height: "60px" }}
            />
            <div className="media-body my-3">
              <h5>
                {review.userName+" "} 
                
                <small className="text-muted">
                &bull;
                  <i>{" "+review.date}</i>
                </small>
              </h5>
              <p>
                {review.review}
              </p>
            </div>
          </div>
          ))}
          </div>
            <a
              className="text-center"
              href="#modal-head" 
            >
              Scroll To Top
            </a>
          
      </div>
    </div>
  );
};

export default Reviews;

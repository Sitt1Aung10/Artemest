import React from "react";
import './blogStyle.css';
const BlogSection = ({
    imgSrc,
    title,
    content,
    discoverLink,
    imageLeft = true,
}) => {
    return (
        <div className="blog-section" style={{ display: "flex", flexDirection: imageLeft ? "row" : "row-reverse" }}>
            <div className="blog-image" >
                <img src={imgSrc} alt="Blog" />
            </div>
            <div className="blog-content">
                <h2>{title}</h2>
                <p>{content}</p>
                <a href={discoverLink} className="discover-link">Discover More</a>
            </div>
        </div>
        
    );
}

export default BlogSection;
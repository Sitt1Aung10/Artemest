import React from 'react'

const RegisterContent = () => {
    return (
        <div id='registerContent'>
            <h1 style={{ textTransform: 'uppercase' }}>are you a design professional?</h1>
            <div>
                <input type='email' />
                <button>Submit</button>
            </div>
            <a to='/'>Already Register?Sign Up</a>
            <article>
                Channeling the essence of high-end Italian craftsmanship and design, Artemest is proud to work with the world’s leading design professionals, including architects, interior designers, and real estate developers across the US, Middle East, Asia Pacific, and Europe.<br></br>

                Boasting over 15,000 trusted members, Artemest Trade Program unlocks a suite of exclusive benefits, specifically conceived to meet design professionals’ needs and bring their creative visions to life. Whether it is creating a one-off bespoke piece or supporting them on larger-scale projects, Artemest dedicated Trade Team provides customized, 360° support to deliver seamless residential, luxury retail, and hospitality projects, from first contact to post-sale assistance.<br></br>

                Sourcing from an assortment of over 50.000 products, most of which are online-exclusive for Artemest and entirely customizable by 1000 of the finest Italian artisans and manufacturers, our experienced Trade consultants are here to identify the best products and styling solutions, to service your project management needs.
            </article>
        </div>
    )
}

export default RegisterContent
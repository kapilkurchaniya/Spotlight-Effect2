
import React from 'react'
import Bgimg from './Bgimg.jsx'
import Profile from './Profile.jsx'
const Card = () => {
  return (
    <div className='card'>
      <div className='bgimg'><Bgimg /></div>
      <div className='Profile'><Profile /> 
      <h1 className='name'>Kapil kurchaniya</h1>
      <p className='role'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, cum!</p>
      </div>
      <div className="bottom" >
      <div className="like">72.9k <p>like</p></div>
      <div className="posts">828 <p>posts</p></div>
      <div className="followers">1.5m <p>followers</p></div>
      </div>
      <hr />
      <div className="handles">
        <div className="insta"><i class="ri-instagram-line"></i></div>
        <div className="twitter"> <i class="ri-twitter-x-fill"></i></div>
        <div className="trends"><i class="ri-threads-fill"></i></div>
      </div>
    </div>
  )
}

export default Card

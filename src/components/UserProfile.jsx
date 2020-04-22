import React from 'react'
import UserProfile from 'react-user-profile'
 

const ProfilePage = () => {
    let photo = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.quartzmasters.com%2Fdesigner-directory%2Farticle-user-blank%2F&psig=AOvVaw1VYiCE5aVtu3eZ8wCti-EQ&ust=1587634859509000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiki_Pe--gCFQAAAAAdAAAAABAD'
    let userName = 'Harvey Specter'
    let location = 'New York, USA'
 
    return (
      <div style={{ margin: '0 auto', width: '100%' }}>
        <UserProfile photo={photo} userName={userName} location={location}/>
      </div>
    )
  }
 
export default ProfilePage
import { Component } from "react";

import "./index.css";

class Profile extends Component {
  render() {
    const { profileImageUrl, name, shortBio } = this.props;
    return (
      <div className="bg-profile">
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    );
  }
}

export default Profile;

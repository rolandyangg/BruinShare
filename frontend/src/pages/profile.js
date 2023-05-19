export default function Profile() {
    const user = JSON.parse(localStorage.getItem('user'));
    return <h1>PROFILE PAGE FOR {user.firstname}</h1>;
  }
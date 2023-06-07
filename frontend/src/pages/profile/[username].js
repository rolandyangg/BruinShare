import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Profile from '../pages/profile.js';
import * as api from '../pages/api/profile.js';

export default function ProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (username) {
      api.getUserByUsername(username)
        .then((response) => {
          if (response) {
            setProfile(response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [username]);

  return (
    <div>
      {profile && <Profile profile={profile} />}
    </div>
  );
}
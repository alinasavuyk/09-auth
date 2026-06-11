import css from '@/components/ProfilePage/ProfilePage.module.css'
import { Metadata } from "next";
import { getServerMe } from '@/lib/api/serverApi';
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profile | Notes App",
  description: "View and manage your profile information in Notes App.",
  keywords: ["profile", "user", "notes app"],
  openGraph: {
    title: "Profile | Notes App",
    description: "View and manage your profile information in Notes App.",
    url: "https://09-auth-six-dusky.vercel.app/profile",
    siteName: "Notes App",
    type: "website",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notes App – User Profile",
      },
    ],
  },
};

const ProfilePage = async ()=>{
    const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={user.username}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>{`Username: ${user.username}`}</p>
          <p>{`Email: ${user.email}`}</p>
        </div>
      </div>
    </main>
  );
}
export default ProfilePage
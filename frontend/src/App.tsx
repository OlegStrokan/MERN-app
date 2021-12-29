import React from 'react';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Posts } from './pages/Posts/Posts';
import { Header } from './components/Header/Header';
import { Users } from './pages/Users/Users';
import { auth } from './mobx/auth';
import { users } from './mobx/users';
import { posts } from './mobx/posts';
import styles from './App.module.css';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => {

  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      auth.me()
      users.getUsers()
      posts.getPosts()
}
  }, [])

  return (
    <div className={openMenu ? styles.rootOpen : styles.rootClose}>
      <div className={styles.header}><Header openMenu={openMenu} setOpenMenu={setOpenMenu}/></div>
      <div className={styles.navbar}>{openMenu && <Navbar/>}</div>
      <div className={styles.content}>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/posts" element={<Posts/>}/>
      </Routes>
      </div>
    </div>
  );
};

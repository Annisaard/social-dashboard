import { Outlet, Route, Routes } from "react-router-dom";
import Sidemenu from "./components/layout/Sidemenu";
import ErrorPage from "./components/ErrorPage";
import User from "./modules/user/User";
import UserDetail from "./modules/user/UserDetail";
import PostPage from "./modules/posts/Post";
import PostDetail from "./modules/posts/PostDetail";
import AlbumPage from "./modules/album/Album";
import { AlbumDetail } from "./modules/album/AlbumDetail";
import { Dashboard } from "./modules/dashboard/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/users" element={<User />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/albums" element={<AlbumPage />} />
        <Route path="/albums/:id" element={<AlbumDetail />} />
      </Route>
    </Routes>
  );
}

function Root() {
  return (
    <div className="flex h-screen">
      <Sidemenu />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
export default App;


import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ProfileUpdate from './Pages/profileUpdate/profileUpdate'
import MyProfile from "./Pages/profileSet/myProfile";
import { MainFormUpdate } from './Pages/update/mainFormUpdate';
import { MainForm } from './Pages/familyForm/mainForm';
import Display from './components/display/display';
import Nav from './components/navbar/nav';
import SignUp from './features/googleSignInEmail/signUp';
import SignIn from './features/googleSignInEmail/signIn';



function App() {
const navigate = useNavigate()
// const loggedin = localStorage.getItem("email")
  // useEffect(()=>{
  //   if (!loggedin) {
  //     navigate('/signin');
  //   }
  // }, [loggedin])

  return (
    <div>
    <Nav/>
    <Routes>
       
          <Route path="/form" element={<MainForm />} />
          <Route path="/update/:id" element={<MainFormUpdate />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Display />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/edit/:id" element={<ProfileUpdate />} />
         
      </Routes>
    </div>
  
  );
}

export default App;

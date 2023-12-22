import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './nav.css';
import { useDispatch } from 'react-redux';
import { clearform } from '../../redux/reducers/stepperHandleData';
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedOut(true); 
    navigate('/signin'); 
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleEdit = () => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    const id = user._id;
    if (id) {
      navigate(`/edit/${id}`); 
    } else {
      console.error("ID not found in localStorage");
    }
  };

  const createroute = () => {
    dispatch(clearform());
    navigate('/form');
  }

  useEffect(() => {
    if (isLoggedOut) {
      setIsLoggedOut(false); 
    }
  }, [isLoggedOut]);

  
  const token = localStorage.getItem("accessToken")

  return (
    <div className='navbar'>
      <h1 className='heading'>
        <Link to='/'>COVID APP</Link>
      </h1>
      <ul className='nav-menu'>
       {
        isLoggedIn && token ?
         <>
         <Link to='/'>
           <li style={{marginTop: "20px"}}>Display</li>
         </Link>

         <div onClick={createroute}>
           <li style={{marginTop: "20px"}}>Create</li>
         </div>

         <li>
           <Box colorScheme="red">
             <Menu colorScheme="blue">
               <MenuButton>
                 <Avatar name="Avatar" src="https://bit.ly/broken-link">
                   <AvatarBadge boxSize="1.25em" bg="green.500" />
                 </Avatar>
               </MenuButton>
               <MenuList>
                 <Flex>
                   <MenuItem
                     color="#2B6CB0"
                     onClick={handleProfile}
                     justifyContent={"space-between"}
                   >
                     Profile
                     <Avatar name="Avatar" src="https://bit.ly/broken-link">
                       <AvatarBadge boxSize="1.25em" bg="green.500" />
                     </Avatar>
                   </MenuItem>
                 </Flex>
                 <MenuItem
                   icon={<EditIcon />}
                   color="#2B6CB0"
                   onClick={handleEdit}
                 >
                   Edit
                 </MenuItem>
                 <MenuItem color="red" onClick={handleLogout}>
                   Logout
                 </MenuItem>
               </MenuList>
             </Menu>
           </Box>
         </li>
       </>
       : null
       }
      </ul>
    </div>
  );
};

export default Nav;

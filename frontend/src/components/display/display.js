import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./display.css";
// import { axiosInstance } from "../../services/axiosInstance";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import BarChart from "../charts/barChart";
import ClusterMap from "../maps/clusterMap";
import { useDispatch } from "react-redux";
import { updateformcompleted } from "../../redux/reducers/stepperHandleData";
import { format } from "date-fns";
import { clearform } from "../../redux/reducers/stepperHandleSlice";
import { useToast } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { storeProfile } from "../../redux/reducers/profileUpdateSlice";
import { useAxiosInstance } from "../../services/useAxiosInstance";

const Display = () => {
  const navigate = useNavigate();
  const [currentpage, setCurrentpage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const toast = useToast()
  const [details1, setDetails1] = useState([]);
  const [time, setTime] = useState(false);
  const [date, setDate] = useState("");
  const {axiosInstance} = useAxiosInstance()

  const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const useremail = user.email;
  

  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //get all details
  const getAllDetails = async () => {

    

    try {
      const details = await axiosInstance.get( `/families/${useremail}`);
      if (details) {
      
        setDetails1(details.data.allFamilyDetails);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //delete data
  const deleteData = async (id) => {
    try {
      const deleteAll = await axiosInstance.delete(
        `/deleteRoute/${id}`);
      if (deleteAll) {
        toast({
          position: 'bottom',
          render: () => (
            <Box color='white' p={2} bg='red' style={{ textAlign: "center" }}>
              Deleted Successfully
            </Box>
          ),
        })
      }
      getAllDetails();
    } catch (err) {
      console.log(err);
    }
  };

  //check which one to display
  useEffect(() => {
    if (time === false) {
      dispatch(clearform());
      getAllDetails();
    } else {
      fetchData();
    }
  }, []);

  
  const fetchData = async () => {
  
    try {
      if (!date) {
        console.error("Date is empty or undefined.");
        return;
      }

      const response = await axiosInstance.get(
        `/count-data/${useremail}/${date === "" ? "120" : date}`);

      if (response.data) {
        
        setDetails1(response.data);
      } else {
        console.error("No data returned from the server.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const sendInvite = () => {
    const sendInvite1 =  axiosInstance.post(
      '/send-mail',
      {
        sender: localStorage.getItem('email'),
        receiver: email,
      }
    );
    if (sendInvite1) {
      closeModal();
      toast({
        position: 'bottom',
        render: () => (
          <Box color='white' p={2} bg='blue' style={{ textAlign: "center" }}>
            Invited Successfully
          </Box>
        ),
      })
    }
  };

  const updateDetails = async (email, id) => {
    const details = await axiosInstance.get(`/families1/${id}`);
  
    if (details) {
      const newdata = details.data.allfamily1;
      dispatch(updateformcompleted({ ...newdata, ...newdata.members[0] }));
    }
    navigate(`/update/${id}`);
  };

  const handleChange = (e) => {
    setDate(e.target.value);
  };
  
 

  return (
    <>
      <div
        style={{
          fontWeight: "bolder",
          fontSize: "30px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <h1>Welcome to Covid App</h1>
      </div>
      <br />
      <br />

      <div className="bar-chart-container">
        <BarChart />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
        <div style={{ display: "flex", marginLeft: "60px" }}>
          <select
            style={{
              width: "150px",
              height: "40px",
              border: "1px solid #E2E8F0",
              borderRadius: "4px",
              padding: "6px",
              marginRight: "8px",
              marginTop: "9px",
            }}
            onChange={handleChange}
          >
            <option value="1">Month Before</option>
            <option value="2">2 Months Before</option>
            <option value="12">Year Before</option>
            <option value="24">2 Years Before</option>
            <option value="1000">Show All Data</option>
          </select>
          <Button colorScheme="green" onClick={fetchData} className="invButton">
            Search
          </Button>
        </div>
        <Button colorScheme="green" onClick={openModal} className="invButton">
          Invite
        </Button>
      </div>
      <div className="main">
        <TableContainer style={{ marginTop: "-30px" }}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th style={{ textAlign: "center" }}>Full Name</Th>
                <Th style={{ textAlign: "center" }} isNumeric>
                  Group
                </Th>
                <Th style={{ textAlign: "center" }}>Address</Th>
                <Th style={{ textAlign: "center" }}>Gender</Th>
                <Th style={{ textAlign: "center" }}>Covid Status</Th>
                <Th style={{ textAlign: "center" }}>Infected Date</Th>
                <Th style={{ textAlign: "center" }}>Edit</Th>
                <Th style={{ textAlign: "center" }}>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {details1.slice(currentpage * 5, (currentpage + 1) * 5).map((item, id) => {
                if (item && item.members && item.members[0]) {
                  return (
                    <Tr key={id}>
                      <Td style={{ textAlign: "center" }}>
                        {item.members[0].fullName}
                      </Td>
                      <Td style={{ textAlign: "center" }}>{item.groupName}</Td>
                      <Td style={{ textAlign: "center" }}>
                        {item.members[0].address}
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        {item.members[0].gender}
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        {item.members[0].covidStatus}
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        {format(
                          new Date(item.members[0].infectedDays),
                          "dd/MM/yyyy"
                        )}
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        <Button
                          colorScheme="yellow"
                          onClick={() => updateDetails(email, item._id)}
                        >
                          Edit
                        </Button>
                      </Td>
                      <Td style={{ textAlign: "center" }}>
                        <Button
                          colorScheme="red"
                          onClick={() => deleteData(item._id)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                }
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          display: "flex",
          width: "90vw",
          justifyContent: "space-between",
          marginLeft: "60px",
          marginTop: "-20px",
        }}
      >
        <Button colorScheme="green" isDisabled={currentpage === 0 ? true : false} onClick={() => setCurrentpage(currentpage - 1)}>Prev</Button>
        <Button colorScheme="green" isDisabled={details1.length - 6 < currentpage * 5 ? true : false} onClick={() => setCurrentpage(currentpage + 1)}>Next</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite other users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => sendInvite()}>
              send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Display;


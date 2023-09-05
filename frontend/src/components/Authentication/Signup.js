import { FormControl, FormLabel, VStack,Input, InputGroup, InputRightElement, Button} from '@chakra-ui/react'
import React,{useState} from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Signup = () => {
    const [show , setShow] =useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] =useState("");
    const [confirmpassword,setConfirmpassword] = useState("");
    const [password,setPassword] =useState("");
    const [pic,setPic] = useState("");
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    // const history = useHistory();

    const handleClick = () => setShow(!show);
    
    const postDetail = (pics) => {
        setLoading(true);
        if(pics === undefined){
            toast({
                title: 'Please Select an image!',
                // status: 'Warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
              });
              return;
        }

        if(pics.type === "image/jpeg" || pics.type ===  "image/png"){
           const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-app");
            data.append("cloud_name","ddwobfys1");
            fetch("https://api.cloudinary.com/v1_1/ddwobfys1" ,{
                method: 'post',
                body: data,
            }).then((res) => res.json())
            .then(data => {
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
            }  else{
                toast({
                    title: 'Please Select an image!',
                    // status: 'Warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                  });
                  setLoading(false);
                  return;
        }

    };
    
    const submitHandler = async() => {
        setLoading(true);
        if(!name || !email || !password || !confirmpassword) {
            toast({
                title: 'Please fill all the fields',
                // status: 'Warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
              });
              setLoading(false);
              return;
        }
        if(password !== confirmpassword) {
            toast({
                title: 'Password Do Not Match',
                // status: 'Warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
              });
             
              return;
        }

        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const {data} = await axios.post(
                "/api/user",
                {name,email,password,pic},
                config
                );
                toast({
                    title: 'Registration Successful',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                  });
                 
                localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false);
                // history.push('chats')

        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
              });
              setLoading(false);
        }

    }
   return (
    <VStack spacing={'5px'} color= {"black"}>
        <FormControl id="First-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
            id = "name" 
            placeholder="Enter Your Name"
            onChange = {(e)=>setName(e.target.value)}
            />
        </FormControl>
        <FormControl id="Email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
            value = {email}
            id = "email"
            placeholder="Enter Your Email"
            onChange = {(e)=>setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl id="Password" isRequired>
            <FormLabel >Password</FormLabel>
            <InputGroup>
            <Input
            value={password}
            id='password'
            type= {show ? "text" : 'password'}
            placeholder="Enter password"
            onChange = {(e)=>setPassword(e.target.value)}
            />
            <InputRightElement width={"4.5rem"}>
                <Button h="1.74rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="Confirmpassword" isRequired>
            <FormLabel>ConfirmPassword</FormLabel>
            <InputGroup>
            <Input
            id="confirmpassword"
            type= {show ? "text" : 'password'}
            placeholder="Enter confirm password"
            onChange = {(e)=>setConfirmpassword(e.target.value)}
            />
            <InputRightElement width={"4.5rem"}>
                <Button h="1.74rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id="Pic" isRequired>
            <FormLabel>Upload your Picture</FormLabel>
            <Input
            id="pic"
            type = "file"
            p= {1.5}
            accept ="image/*"
            onChange = {(e)=>postDetail(e.target.files[0])}
            />
        </FormControl>
        <Button
        colorScheme='blue'
        width = "100%"
        style={{marginTop: 15}}
        onClick = {submitHandler}
        isLoading = {loading}
        >Sign Up</Button>
    </VStack>
  )
}

export default Signup

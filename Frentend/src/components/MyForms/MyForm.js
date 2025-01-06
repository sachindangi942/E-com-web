import React, { useState } from "react";
import "./style.css"
import MyInput from "../MyInputs/MyInput";
import Registration_Val from "../../Validations/Registration_Val";
import axios from "axios";
import { DOMAIN } from "./Configs";
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";



const MyForm = () => {
    const navigate = useNavigate();
    const [usrData, setUsrData] = useState({})
    const [err, setErr] = useState({})
    const [loading, setLoading] = useState(false);

    const onChangeEvent = (obj) => {
        setErr("")
        setUsrData((lastValue) => {
            lastValue[obj.id] = obj.value;
            return { ...lastValue }
        })

    };

    const Registration = async (e) => {
        e.preventDefault();
        try {
            const { error, value } = Registration_Val(usrData);
            if (error) {
                let errObj = {};
                error.details.forEach((detail) => {
                    errObj[detail.path[0]] = detail.message;
                });
                return setErr(errObj);

            }
            setErr("")
            setLoading(true);
            const res = await axios.post(`${DOMAIN}user/registration`, value)
            setLoading(false);
            if (res.data) navigate("/singIn");
            setErr(res.message);

        } catch (err) {
            if (err.response?.data) {
                const errorData = err.response.data;

                if (typeof errorData === 'string') {
                    const match = errorData.match(/dup key: \{ (\w+): "(.*?)"/);
                    if (match) {
                        const field = match[1];
                        const value = match[2];
                        setErr({ [field]: ` "${value}" is already exist` });
                    } else {
                        setErr({ general: 'An unknown error occurred' });
                    }
                }
                else if (typeof errorData === 'object' && errorData.keyValue) {
                    const field = Object.keys(errorData.keyValue)[0];
                    const value = errorData.keyValue[field];
                    setErr({ [field]: ` "${value}" is already exist` });
                }
                else {
                    setErr({ general: 'Error format is not recognized' });
                }
            } else {
                setErr({ general: 'Failed to connect to the server' });
            }
        }


    };

    return (
        <Box component="form"
            className="mb-4"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off">

            <div className="form-container">
                <h5>Create Your Account</h5>
                <MyInput
                    placeholder="Enter Name"
                    id="Name"
                    onChange={onChangeEvent}
                    err={err}
                />
                <MyInput
                    placeholder="Enter Email"
                    id="Email"
                    type="email"
                    onChange={onChangeEvent}
                    err={err}
                />
                <MyInput
                    placeholder="Enter Mobile"

                    id="Mobile"
                    type="number"
                    onChange={onChangeEvent}
                    err={err}
                />
                <MyInput
                    placeholder="Enter password"

                    id="password"
                    type="password"
                    onChange={onChangeEvent}
                    err={err}
                />
                <MyInput
                    placeholder="Enter confirm Password"

                    id="confirmPassword"
                    type="password"
                    onChange={onChangeEvent}
                    err={err}
                />
                <Button
                    disabled={loading}
                    className={loading ? "btn border border-info w-25" : " btn btn-info border border-info "}
                    size="large"
                    onClick={Registration}>
                    {loading ?<Spin indicator={<LoadingOutlined spin  className="text-info"/>}/>: "Register"}
                </Button>
                <br />
                <br />
                <Link to={"/singIn"}>Existing user? Sign in here</Link>
            </div>
        </Box>
    )
}

export default MyForm;
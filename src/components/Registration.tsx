import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import {
  PasswordOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

export interface IValues {
  type: string;
  email: string;
  password: string;
  name: string;
  education: any[];
  skills: any[];
  resume: string;
  profile: string;
  bio: string;
  contactNumber: string;
}

export const Registration = () => {
  const initialValues: IValues = {
    type: "recruiter",
    email: "",
    password: "",
    name: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
    bio: "",
    contactNumber: "",
  };

  const validationSchema = yup.object().shape({
    type: yup.string(),
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid type").required("Email is required"),
    password: yup.string().required("Password is required"),
    bio: yup.string(),
    contactNumber: yup
      .string()
      .matches(/[0-9]/, "Invalid input")
      .max(10, "Too long")
      .min(10, "Too short")
      .required("Phone number is required"),
  });

  // const [showPassword, setShowPassword] = React.useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };

  // const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.contactNumber = "+91" + values.contactNumber;
      // console.log(JSON.stringify(values, null, 2));
      const data = JSON.stringify(values, null, 2);
      console.log(JSON.parse(data));
      try {
        const req = await axios.post(
          "http://localhost:4444/auth/signup",
          JSON.parse(data)
        );
        if (req.status === 200) {
          toast.success("User has been Registered Successfully");
        }
        console.log("Status", req.status);
      } catch (err: any) {
        console.log("Error", err.status);
        if (err.status === 400) {
          toast.error("Invalid input Error : " + err);
        }
        if(err.status === 500) {
          toast.error("Internal server error")
        }
      }

     
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Container sx={{ my: "2rem" }}>
          <Stack sx={{ maxWidth: "25rem", mx: "auto" }} spacing={3}>
            <Typography textAlign="center" variant="h3" mb="3rem">
              Signup
            </Typography>
            <TextField
              fullWidth
              select
              id="demo-simple-select"
              value={formik.values.type}
              name="type"
              label="Category"
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            >
              <MenuItem value="recruiter">Recruiter</MenuItem>
              <MenuItem value="applicant">Applicant</MenuItem>
            </TextField>

            <TextField
              label="Name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              label="Email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              type="password"
              label="Password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {/* <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id='password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </FormControl> */}

            <TextField
              id="bio"
              name="bio"
              label="Bio (upto 250 words)"
              multiline
              rows={4}
              value={formik.values.bio}
              onChange={formik.handleChange}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
            />

            <TextField
              id="contactNumber"
              name="contactNumber"
              label="Phone"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                },
              }}
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.contactNumber &&
                Boolean(formik.errors.contactNumber)
              }
              helperText={
                formik.touched.contactNumber && formik.errors.contactNumber
              }
            />

            <Button type="submit" variant="contained">
              Sign Up
            </Button>
          </Stack>
        </Container>
      </form>
    </div>
  );
};

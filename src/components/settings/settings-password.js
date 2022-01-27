import {useEffect, useState} from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  password: yup.string().required('Password is required'),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  
});


export const SettingsPassword = (props) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
      id: props.customer.id,
      password: '',
      confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    // POST request using fetch with error handling
    if(loading) {
      const url = 'http://localhost:8080/customer/password' + props.customer.id;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        body: JSON.stringify(values)
      };
      fetch(url, requestOptions)
          .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }

            // return parsed json if response is successful
            setValues(
                {
                    ...values,
                    password: '',
                    confirm: '',
                }
            );
              props.setalert({
                  open: true,
                  message: 'Customer updated successfully',
                  severity: 'success',
              });
            setLoading(false);
          })
          .catch(error => {
            //this.setState({ errorMessage: error.toString() });
              props.setalert({
                  open: true,
                  message: 'Error updating password',
                  severity: 'success',
              });
            setLoading(false);
          });
    }

// empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [loading]);

    const formik = useFormik({
        initialValues: {
            ...values,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setValues(
                {
                    password: values.password,
                    confirm: values.confirm
                }
            );
            setLoading(true);
        },
    });

    return (
    <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            type="password"
            variant="outlined"
            value={formik.values.confirm}
            onChange={formik.handleChange}
            error={formik.touched.confirm && Boolean(formik.errors.confirm)}
            helperText={formik.touched.confirm && formik.errors.confirm}
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

import React, {useState} from 'react';
import {withFormik, Field, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {useGlobal, setGlobal} from 'reactn';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

let users = [];

function UserForm({ values, touched, errors, status }) {

    return(<div>
        <Form>
            <label htmlFor='name'>
                Name: 
            <Field id='name' type='text' name='name' placeholder='Name'/>
            </label><br/>
            <label htmlFor='email'>
                Email: 
            <Field id='email' type='email' name='email' placeholder='Email Address'/>
            </label><br/>
            <label htmlFor='pass'>
                Password: 
            <Field id='pass' type='password' name='password' placeholder='Password'/>
            </label><br/>
            <label htmlFor='tos'>
                TOS: 
            <Field id='tos' type='checkbox' name='tos' checked={values.tos}/> <span className='checkmark'/>
            </label><br/>
            <button type="submit">Submit!</button>
        </Form>
        {users.map(member => (
            <div key={member.id}>
            <Card>
              <CardBody>
                <CardTitle>Name: {member.name}</CardTitle>
                <CardSubtitle>Email: {member.email}</CardSubtitle>
                <CardText>Password: {member.password}</CardText>
              </CardBody>
            </Card>
          </div>
    ))}
</div>
    )
}

const FormikUserForm = withFormik({
mapPropsToValues({name, email, password, tos}) {
    return {
        name: name || '',
        email: email || '',
        password: password || '',
        tos: tos || false
    };
},
validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    tos: Yup.boolean().oneOf([true], 'You must Accept the Terms of Service')
}),
handleSubmit(values, {setStatus, resetForm}) {
    console.log('Submitted', values);
    axios.post('https://reqres.in/api/users/', values)
    .then(res => {
        console.log('Yeet', res);
        setStatus(res.status);
        users.push(res.data);
        resetForm();
    });
}
})(UserForm);

export default FormikUserForm;
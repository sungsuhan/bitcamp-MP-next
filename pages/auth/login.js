import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { userLogin } from '@/modules/auth/login';
import { Login } from '@/components/auth/Login';

const LoginPage = () => {
    const [user, setUser] = useState({
        userid:'', password:''
    })
    const dispatch = useDispatch()
    const onChange = e =>{
        e.preventDefault()
        const{name, value} = e.target;
        setUser({...user,[name]: value})
    }
    const onSubmit = e => {
        e.preventDefault()
        alert('로그인정보: '+JSON.stringify(user))
        dispatch(userLogin(user))
    }

  return (
    <Login onChange={onChange} onSubmit={onSubmit}/>
  );
};

export default connect(
  state => ({
    user: state.user
  }),
  {
    userLogin
  }
)(LoginPage);
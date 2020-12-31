import React, {useState} from 'react'


const initialFormState = {
    username: "",
    email: "",
    password: ""
}

function Register() {

    const [form, setForm] = useState(initialFormState)
    const [user, setUser] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(form);
        setForm(initialFormState);
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Register</h1>
            <form style={formStyle} onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' name='username' onChange={handleChange} value={form.username} />
                <input type='email' placeholder='Email' name='email' onChange={handleChange} value={form.email} />
                <input type='password' placeholder='Password' name='password' onChange={handleChange} value={form.password} />
                <button type='submit'>Register</button>
            </form>

            {user && JSON.stringify(user, null, 2)}

        </div>

    )
}

const formStyle = {
    display: 'grid',
    textAlign: 'center',
    justifyItems: 'center'
}

export default Register;

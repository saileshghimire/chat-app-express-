// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import { connectSocket } from "../helper/socket";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       // Send login request to backend
//       const response = await axios.post("http://192.168.1.122:3000/api/v1/user/login", {
//         email,
//         password,
//       });

//       const { access_token, username } = response.data; // Assume the backend sends a token on successful login
//       const token = access_token;
//       localStorage.setItem("username", username); 
//       localStorage.setItem("token", token); // Store the token in localStorage
//       // connectSocket(); // Connect to socket server with JWT token
//       navigate("/chat"); // Redirect to chat page
//     } catch (err) {
//       setError("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <div className="error">{error}</div>}
//       <input
//         type="text"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;

import { useAuthStore } from "../store/authstore";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";


const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const Login = () => {
  const { login, loading, error } = useAuthStore();

  const form  = useForm({
    defaultValues:{
      username:"",
      password:"",
    },
    validators:{
      onChange:(values:any) => loginSchema.safeParse(values).success || "Invalid form data",
    },
    onSubmit: async(values:any) => login(values.username, values.password),
  })
return(
  <>
  <div className="p-4">
      <h2>Login</h2>
      <form
        className="flex flex-col space-y-4"
        onSubmit={(e)=>{
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}>
          <form.Field name="username">
            {(field)=>(
              <>
              <label htmlFor={field.name}>Username</label>
              <input
                id={field.name}
                type="text"
                value={field.state.value}
                className="p-2 border" />
                {field.state.meta.errors ? (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              ) : null}
              </>
            )}
          </form.Field>
          <form.Field name="password">
            {(field)=>(
              <>
              <label htmlFor={field.name}>Password</label>
              <input
                id={field.name}
                type="password"
                value={field.state.value}
                className="p-2 border" />
                {field.state.meta.errors ? (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              ) : null}
              </>
            )}
            </form.Field>
          <form.Subscribe
          selector={(state) => [state.errorMap]}
          children={([errorMap]) =>
            errorMap.onSubmit ? (
              <div>
                <em>There was an error on the form: {errorMap.onSubmit}</em>
              </div>
            ) : null
          }
        />
      </form>
    </div>
  </>
)
}
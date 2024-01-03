import { Link } from "react-router-dom";

function LoginCard() {
 
    return (
      
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form action="#" method="post">
                <input type="text" id="username" name="username" placeholder="Enter your username" required />
                <input type="password" id="password" name="password" placeholder="Enter your password" required />
                <Link className="redirect-to-register" to="/register">Do not have an account? Register here</Link>
                <button type="submit">Login</button>
                </form>
            </div>
        </div>  
    );
  }
  
  export default LoginCard
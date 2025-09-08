import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4 position-relative overflow-hidden"
      style={{
        backgroundImage: `url(https://i.pinimg.com/originals/b0/6b/3f/b06b3fc0bf44efcd3c1be170640cacbd.gif)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" />

      {/* Floating particles */}
      <div className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="position-absolute rounded-circle bg-warning opacity-50"
            style={{
              width: "8px",
              height: "8px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: "pulse 3s infinite",
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div className="card shadow-lg position-relative z-1" style={{ maxWidth: "420px", width: "100%", background: "rgba(239, 232, 232, 0.6)" }}>
        <div className="card-body p-4">
          <div className="container p-0"><button
            className="btn text-purple mb-2 p-0"
            onClick={() => navigate("/")}
            >
              <ArrowLeft className="bi bi-arrow-left me-2"/> Back to Shopping
           </button></div>
          <div className="text-center mb-4">
            <div className="mx-auto bg-purple rounded-circle d-flex align-items-center justify-content-center shadow"
              style={{ width: "64px", height: "64px", fontSize: "24px"}}>
           🪔
            </div>
            <h3 className="mt-3 fw-bold text-purple">Welcome Back</h3>
            <p className="text-dark">Celebrate the Festival of Lights with us</p>
          </div>

          <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label text-muted" htmlFor="remember">
                  Remember me
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-purple w-100 fw-bold">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="px-2 text-muted small">Or continue with</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Social logins */}
          <div className="row g-2 mb-3">
            <div className="col">
              <button className="btn btn-outline-purple w-100 d-flex align-items-center justify-content-center">
                <svg className="me-2" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg> 
                Google
              </button>
            </div>
            <div className="col">
              <button className="btn btn-outline-purple w-100 d-flex align-items-center justify-content-center">
                <svg className="me-2" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>

          <div className="text-center text-muted small">
            Don't have an account?{" "}
            <button
                  type="button"
                   className="p-0 m-0 border-0 bg-transparent text-purple text-decoration-none"
                  style={{ cursor: "pointer" }}
            >Sign up for free</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

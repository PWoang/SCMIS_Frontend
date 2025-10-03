import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  Row,
  Container,
  Col,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
import { useState } from "react";

import { BsEye, BsEyeSlash, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

import { FcGoogle } from "react-icons/fc";

import "./login.css"

 const Login = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isValid,
      submitCount,
      touchedFields,
      isSubmitted,
    },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });
  //pattern for password
  const pwd = watch("password", "");
  const hasMin = pwd.length >= 8;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNum = /\d/.test(pwd);
  const allGood = hasMin && hasUpper && hasNum;

  const pwdTouchedOrSubmitted = touchedFields.password || isSubmitted;

  const canSubmit = isValid && !isSubmitting;

  const showEmailErr = !!errors.email && (touchedFields.email || isSubmitted);
  const showPassErr = !!errors.password && pwdTouchedOrSubmitted;

  //load API
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Đăng nhập thất bại");
      }

      console.log("Đăng nhập thành công:", result);
      console.log(
        "data user: " +
          result.user.firstName +
          " " +
          result.user.lastName +
          " " +
          result.user.email
      );
      window.alert(result.message + " " + result.token);
      console.log(result);

      if (result.token) {
        localStorage.setItem("token", result.token);
        // Chuyển hướng
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error.message);
      alert(error.message);
    }
  };

  const [showPass, setShowPass] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={10} md={7} lg={5} xl={4}>
          <h2 className="text-center fw-bold mb-4"> Log In</h2>

          {/* Email */}
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className="mb-3 ">
            <Form.Group controlId="email" className="mb-3">
              <FloatingLabel
                controlId="floatingEmail"
                label="Email address"
                className="mb-2 text-muted"
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="py-3 rounded-4 no-validate-icon"
                  isInvalid={showEmailErr}
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.com$/i,
                      message: "Please provide a valid .com email",
                    },
                  })}
                  aria-describedby="emailHelpBlock"
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password + eye */}
            <Form.Group
              controlId="password"
              className="mb-3 position-relative "
            >
              <div className="position-relative">
                <FloatingLabel
                  controlId="floatingPassword"  
                  label="Password"
                  className="text-muted"
                >
                  <Form.Control
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    isInvalid={pwdTouchedOrSubmitted && !allGood}
                    {...register("password", {
                      required: "Please enter your password!",
                      // Đảm bảo isValid chỉ true khi pass đủ 3 điều kiện
                      validate: (v) => {
                        if (v.length < 8)
                          return "Password must be at least 8 character long!";
                        if (!/[A-Z]/.test(v))
                          return "Must include at least 1 uppercase letter!";
                        if (!/\d/.test(v))
                          return "Must include at least 1 number!";
                        return true;
                      },
                    })}
                    className="py-3 rounded-4 pe-5 fw-100 no-validate-icon" // chừa chỗ cho icon
                    aria-describedby="passwordHelpBlock"
                  />
                </FloatingLabel>

                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label="Toggle password visibility"
                  className="position-absolute top-50 end-0 translate-middle-y me-3 p-0 bg-transparent border-0"
                  style={{ zIndex: 10 }} // nằm trên label/input
                >
                  {showPass ? <BsEyeSlash/> : <BsEye />}
                </button>
              </div>
              {/*Show password error pattern   */}
              {showPassErr && (
                <ul className="list-unstyled small mt-2 mb-0 ms-2">
                  <li className={hasMin ? "text-success" : "text-danger"}>
                    {hasMin ? (
                      <BsCheckCircleFill className="me-2" />
                    ) : (
                      <BsXCircleFill className="me-2" />
                    )}
                    1. Đủ 8 ký tự trở lên
                  </li>
                  <li className={hasUpper ? "text-success" : "text-danger"}>
                    {hasUpper ? (
                      <BsCheckCircleFill className="me-2" />
                    ) : (
                      <BsXCircleFill className="me-2" />
                    )}
                    2. Có ít nhất 1 chữ hoa
                  </li>
                  <li className={hasNum ? "text-success" : "text-danger"}>
                    {hasNum ? (
                      <BsCheckCircleFill className="me-2" />
                    ) : (
                      <BsXCircleFill className="me-2" />
                    )}
                    3. Có ít nhất 1 số
                  </li>
                </ul>
              )}
            </Form.Group>

            {/* Keep me logged in */}
            {/* <div className="w-100 d-flex justify-content-center  align-items-center  gap-3 mb-3">
              <Form.Check
                type="switch"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="fs-4 my-switch"
              />
              <span className="fs-6 fw-semibold">Keep me logged in</span>
            </div> */}

            {/* Sign up / Log in (pill group) */}
            <Row className="mb-3 gx-3">
              <Col
                xs={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Button
                  variant="link"
                  className="text-decoration-none fw-semibold p-0"
                  style={{ color: "#7c3aed" }}
                >
                  Sign up
                </Button>
              </Col>
              <Col xs={6} className="d-flex justify-content-center">
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="rounded-pill fw-semibold px-5 py-3"
                  style={{
                    background: canSubmit ? "#7c3aed" : "#bfbfc2",
                    color: canSubmit ? "#fff" : "#555",
                    border: 0,
                    transition: "background .2s ease",
                  }}
                >
                  {isSubmitting ? "Logging in..." : "Submit"}
                </Button>
              </Col>
            </Row>

            {/* Divider */}
            <div className="d-flex align-items-center my-4">
              <div className="flex-grow-1 border-top" />
              <span className="px-3 text-muted">OR</span>
              <div className="flex-grow-1 border-top" />
            </div>

            {/* Passwordless */}
            {/* <Button
              variant="light"
              className="w-100 py-3 rounded-pill mb-3 border"
            >
              Log in without a password
            </Button> */}

            {/* Google */}
            <Button
              variant="light"
              className="w-100 py-3 rounded-pill border d-flex align-items-center justify-content-center gap-2"
            >
              <FcGoogle />
              Continue with Google
            </Button>

            {/* Forgot */}
            <div className="text-center mt-4">
              <Button
                variant="link"
                className="text-muted text-decoration-none"
              >
                Forgot your password?
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}


// const Login = () => {
//     return (
//         <div>lmao</div>
//     )
// }

export default Login;
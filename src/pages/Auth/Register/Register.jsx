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
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  Eye,
  EyeSlash,
  CheckCircleFill,
  XCircleFill,
} from "react-bootstrap-icons";
import { FcGoogle } from "react-icons/fc";

import "./register.css";

export default function Dangky() {
  const navigate = useNavigate();
  const { data, setData } = useState();

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
      reset,
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
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Lấy JSON từ backend dù success hay lỗi
      const result = await response.json();

      if (!response.ok) {
        // Ném lỗi với message backend trả về (ví dụ email đã dùng)
        throw new Error(result.message || "Lỗi khi gửi dữ liệu");
      }

      window.alert(result.message);
      console.log(result);
      console.log("Đăng ký thành công:", result);

      reset(); // reset form sau khi submit
      navigate("/lingo");
    } catch (err) {
      // Hiển thị lỗi backend hoặc lỗi khác
      console.error(err);
      window.alert(err.message);
    }
  };
  const [showPass, setShowPass] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={10} md={7} lg={5} xl={4}>
          <h2 className="text-center fw-bold mb-4">Sign Up</h2>

          {/* Email */}
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className="mb-3 ">
            <Form.Group controlId="firstName" className="mb-3">
              <FloatingLabel
                controlId="floatingfirstName"
                label="firstName"
                className="mb-2 text-muted"
              >
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  className="py-3 rounded-4 no-validate-icon"
                  isInvalid={showEmailErr}
                  {...register("firstName", {
                    required: "Please enter your first name",
                  })}
                  aria-describedby="firstNameHelpBlock"
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lastName" className="mb-3">
              <FloatingLabel
                controlId="floatingLastName"
                label="LastName"
                className="mb-2 text-muted"
              >
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  className="py-3 rounded-4 no-validate-icon"
                  isInvalid={showEmailErr}
                  {...register("lastName", {
                    required: "Please enter your last name",
                  })}
                  aria-describedby="lastNameHelpBlock"
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </Form.Group>

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
                  {showPass ? <EyeSlash /> : <Eye />}
                </button>
              </div>
              {/*Show password error pattern   */}
              {showPassErr && (
                <ul className="list-unstyled small mt-2 mb-0 ms-2">
                  <li className={hasMin ? "text-success" : "text-danger"}>
                    {hasMin ? (
                      <CheckCircleFill className="me-2" />
                    ) : (
                      <XCircleFill className="me-2" />
                    )}
                    1. Đủ 8 ký tự trở lên
                  </li>
                  <li className={hasUpper ? "text-success" : "text-danger"}>
                    {hasUpper ? (
                      <CheckCircleFill className="me-2" />
                    ) : (
                      <XCircleFill className="me-2" />
                    )}
                    2. Có ít nhất 1 chữ hoa
                  </li>
                  <li className={hasNum ? "text-success" : "text-danger"}>
                    {hasNum ? (
                      <CheckCircleFill className="me-2" />
                    ) : (
                      <XCircleFill className="me-2" />
                    )}
                    3. Có ít nhất 1 số
                  </li>
                </ul>
              )}
            </Form.Group>

            {/* Role */}
            <Form.Group controlId="role" className="mb-3">
              <Form.Select
                aria-label="Role"
                defaultValue="" // placeholder mặc định
                className="py-3 rounded-4"
                isInvalid={!!errors.role}
                {...register("role", { required: "Vui lòng chọn role" })}
              >
                <option value="" disabled>
                  -- Chọn vai trò --
                </option>
                <option value="teacher">Giáo viên</option>
                <option value="parent">Phụ Huynh</option>
              </Form.Select>

              {/* feedback để bên ngoài wrapper floating để tránh lệch layout */}
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.role?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Keep me logged in */}
            <div className="w-100 d-flex justify-content-center  align-items-center  gap-3 mb-3">
              <Form.Check
                type="switch"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="fs-4 my-switch"
              />
              <span className="fs-6 fw-semibold">Keep me logged in</span>
            </div>

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
                  Log In
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
                  {isSubmitting ? "Signing up..." : "Sign Up"}
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

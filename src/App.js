import "./App.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .required("Họ tên không được để trống")
    .min(6, "Họ tên phải từ 6 đến 20 kí tự")
    .max(20, "Họ tên phải từ 6 đến 20 kí tự"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      "Mật khẩu phải có ít nhất 1 kí tự viết hoa và 1 kí tự đặc biệt"
    )
    .min(6, "Mật khẩu phải từ 6 đến 20 kí tự")
    .max(20, "Mật khẩu phải từ 6 đến 20 kí tự"),
  email: yup
    .string()
    .required("Email không được để trống")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email phải đúng định dạng"),
  phone: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "Số điện thoại phải là ký tự số, chấp nhận kí tự +"
    )
    .min(10, "Số điện thoại phải từ 10 đến 12 số")
    .max(12, "Số điện thoại phải từ 10 đến 12 số"),
  address: yup
    .string()
    .required("Địa chỉ không được để trống")
    .matches(/^[A-Za-z\/\,]/, "Địa chỉ bao gồm chữ, chấp nhận kí tự , và / "),
});

function App() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
      email: "",
      phone: "",
      address: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    console.log("Thành công", values);
    alert("Submit form thành công!");
    reset();
  };

  const onError = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    let userName = getValues("name");
    if (userName === "John") {
      setValue("email", "john123@gmail.com", { shouldValidate: false });
      setValue("phone", "+84123456789", { shouldValidate: false });
      setValue("address", "New York City, USA", { shouldValidate: false });
      setValue("password", "john123@Abc", { shouldValidate: false });
    }
  });

  return (
    <div
      style={{
        background: "gray",
        color: "white",
        width: "60vw",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      <h1>My Amazing Web App - Hoàng Dũng test</h1>
      <hr />
      <div style={{}}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "50%", paddingRight: "2rem" }}>
            <h1>This is a Title of My Amazing Web App</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              officia magnam, ab illum harum eos eaque cumque commodi, quisquam
              odio quos modi. Ipsum voluptate molestias eos consectetur adipisci
              ducimus soluta.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            style={{
              height: "auto",
              width: "50%",
              background: "white",
              color: "black",
              padding: "2rem",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h2>Sign Up & Start Your Free Trial</h2>
            <h3>Quick Sign Up</h3>
            <hr style={{ color: "black" }} />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <input
                  style={{ width: "50%" }}
                  type="text"
                  placeholder="Your name"
                  {...register("name")}
                />
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
                <input
                  style={{ width: "50%" }}
                  placeholder="Your email"
                  {...register("email")}
                />
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
              </div>
              <input
                type="text"
                placeholder="Your phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <span style={{ color: "red" }}>{errors.phone.message}</span>
              )}
              <input
                type="text"
                placeholder="Your address"
                {...register("address")}
              />
              {errors.address && (
                <span style={{ color: "red" }}>{errors.address.message}</span>
              )}
              <input
                type="password"
                placeholder="Your password"
                {...register("password")}
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
              <button
                style={{
                  padding: "5px",
                  fontWeight: "bold",
                  background: "gray",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

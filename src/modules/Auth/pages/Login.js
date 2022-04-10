import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { login } from "../slices/auth";
// import InputText from "components/InputText";

const schema = yup.object({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  // .min(5, "Tài khoản phải từ 5 đến 20 kí tự")
  // .max(20, "Tài khoản phải từ 5 đến 20 kí tự"),
  matKhau: yup.string().required("Mật khẩu không được để trống"),
  // .matches(
  //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  //   "Mật khẩu không đúng định dangj"
  // ),
});

function Login() {
  const {
    register,
    control, // Sử dụng kèm với component Controller để tương tác với UI component
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { taiKhoan: "", matKhau: "" },
    mode: "onTouched", // Cơ chế kích hoạt validation,
    resolver: yupResolver(schema), // Sử dụng schema để validate
  });

  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, error } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

  const onSubmit = (values) => {
    console.log(values);
    dispatch(login(values)); // dispatch action login
  };

  const onError = (errors) => {
    console.log(errors);
  };

  if (isLoggedIn) {
    // Nếu isLoggedIn là true
    // Nếu trên url có search params là successUrl thì sẽ navigate về page đó
    // Nếu không có thì navigate về HomePage
    const url = searchParams.get("successUrl") || "/";

    return <Navigate to={url} replace={true} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <label htmlFor="username">Tài khoản</label>
        <input
          type="text"
          id="username"
          {...register(
            "taiKhoan"
            // {
            //   // required: true,
            //   required: { value: true, message: "Tài khoản không được để trống" },
            //   minLength: {
            //     value: 5,
            //     message: "Tài khoản phải từ 5 đến 20 kí tự",
            //   },
            //   maxLength: {
            //     value: 20,
            //     message: "Tài khoản phải từ 5 đến 20 kí tự",
            //   },
            // }
          )}
        />
        {errors.taiKhoan && <span>{errors.taiKhoan.message}</span>}
      </div>

      {/* <div>
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id="password" {...register("matKhau")} />
        {errors.matKhau && <span>{errors.matKhau.message}</span>}
      </div> */}

      {/* Component tự tạo */}
      {/* <InputText
        type="password"
        name="matKhau"
        label="Mật Khẩu"
        errors={errors.matKhau}
        register={register}
      /> */}

      {/* Component của thư viện bên ngoài */}
      <Controller
        name="matKhau"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            type="password"
            label="Mật Khẩu"
            {...field}
            error={fieldState.error?.message}
          />
        )}
      />

      {/* Show lỗi từ phía server */}
      {error && (
        <div>
          <span>{error}</span>
        </div>
      )}

      <button disabled={isLoading}>Đăng Nhập</button>
    </form>
  );
}

export default Login;

// import React, { useState, useRef } from "react";

// function Login() {
//   const [form, setForm] = useState({ taiKhoan: "", matKhau: "" });
//   const [errors, setErrors] = useState({ taiKhoan: "", matKhau: "" });

//   const inpTaiKhoan = useRef(null);

//   const handleChange = (evt) => {
//     const { name, value } = evt.target;
//     setForm((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleBlur = (evt) => {
//     const { name, value } = evt.target;
//     if (!value) {
//       setErrors((prevState) => ({
//         ...prevState,
//         [name]: `Tài khoản không được để trongos`,
//       }));
//     }
//   };

//   console.log("Re-render");
//   return (
//     <form>
//       <div>
//         <label htmlFor="taiKhoan">Tài khoản</label>
//         {/* Sử dụng state để control: Controlled component */}
//         <input
//           type="text"
//           id="taiKhoan"
//           name="taiKhoan"
//           value={form.taiKhoan}
//           onBlur={handleBlur}
//           onChange={handleChange}
//         />
//         {/* Sử dụng ref để control: Uncontrolled component */}
//         {/* <input type="text" id="taiKhoan" ref={inpTaiKhoan} /> */}

//         {errors.taiKhoan && <span>{errors.taiKhoan}</span>}
//       </div>

//       <div>
//         <label htmlFor="matKhau">Mật khẩu</label>
//         <input
//           type="password"
//           id="matKhau"
//           name="matKhau"
//           value={form.matKhau}
//           onChange={handleChange}
//         />
//       </div>
//     </form>
//   );
// }

// export default Login;

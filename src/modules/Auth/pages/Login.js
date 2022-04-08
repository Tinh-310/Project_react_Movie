import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import InputText from "components/InputText";
import { TextInput } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slices/auth";
import { Navigate } from "react-router-dom";

const schema = yup.object({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  // .min(5, " Tài khoản phải từ 5 đến 20 từ")
  // .max(20, "Tài khoản phải từ 5 đến 20 từ"),
  matKhau: yup.string().required("Mật khẩu không được để trống "),
  // .matches(
  //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  //   "Mật khẩu không đúng định dạng"
  // ),
});

function Login() {
  const {
    register,
    control, // sử dụng kèm với component Controller để tương tác với UI component
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { taiKhoan: "", matKhau: "" },
    mode: "onTouched", // Cơ chế kích hoạt validation
    resolver: yupResolver(schema), // Truyền schema vào để sử dụng
  });

  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, error } = useSelector((state) => state.auth);

  const onSubmit = (values) => {
    console.log(values);
    dispatch(login(values)); // dispatch action login
  };
  if (isLoggedIn) {
    // Nếu isLoggedIN là true => redirect user về page Home
    return <Navigate to="/" replace={true} />;
  }
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <label htmlFor="username">Tài Khoản</label>
        <input
          type="text"
          id="username"
          {...register(
            "taiKhoan"
            //   , {
            //     required: {
            //       value: true,
            //       message: " Tài khoản không được để trống",
            //     },
            //     minLength: {
            //       value: 5,
            //       message: "Tài khoản phải từ 5 đến 20 kí tự",
            //     },
            //     maxLength: {
            //       value: 20,
            //       message: "Tài khoản phải từ 5 đến 20 kí tự",
            //     },
            //   }
          )}
        />
        {errors.taiKhoan && <span>{errors.taiKhoan.message}</span>}
      </div>
      {/* <div>
        <label htmlFor="password">Mật Khẩu</label>
        <input type="password" id="password" {...register("matKhau")} />
        {errors.matKhau && <span>{errors.matKhau.message}</span>}
      </div> */}

      {/* // Component tự tạo 
    //   <InputText
    //     type="password"
    //     name="matKhau"
    //     label="Mật Khẩu"
    //     errors={errors.matKhau}
    //     register={register}
        
    //   /> */}

      {/* Component từ thư viện bên ngoài  */}
      <Controller
        name="matKhau"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            type="password"
            label="mật khẩu"
            {...field}
            error={fieldState.error?.message}
          />
        )}
      />
      {/* Show lỗi từ phía sever  */}
      {error && (
        <div>
          <span>{error}</span>
        </div>
      )}

      <button disabled={isLoading}>Đăng nhập </button>
    </form>
  );
}

export default Login;

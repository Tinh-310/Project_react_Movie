import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function AddMovie() {
  const [imgPreview, setImgPreview] = useState("");

  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      ngayKhoiChieu: "",
      // sapChieu: "",
      // dangChieu: "",
      // hot: "",
      trailer: "",
      hinhAnh: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    const payload = { ...values, hinhAnh: values.hinhAnh[0] };

    // dispatch(addMovie(payload))
  };

  // const watchImage = watch("hinhAnh");
  // useEffect(() => {
  //   // Hiển thị hình ảnh vừa chọn ra UI
  //   const file = getValues("hinhAnh")[0];
  //   if (!file) return;
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(file);
  //   fileReader.onload = (evt) => {
  //     setImgPreview(evt.target.result);
  //   };
  // }, [watchImage]);

  const handleChangeImage = (evt) => {
    const file = evt.target.files[0];
    if (!file) return;

    setValue("hinhAnh", evt.target.files); // hàm của react-hook-form
    // setForm(prevState => ({...prevState, hinhAnh: evt.target.files}))

    // Hiển thị hình ảnh vừa chọn ra UI
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setImgPreview(evt.target.result);
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Tên Phim</label>
        <input type="text" id="name" {...register("tenPhim")} />
      </div>

      <div>
        <label htmlFor="code">Bí Danh</label>
        <input type="text" id="code" {...register("biDanh")} />
      </div>

      <div>
        <label htmlFor="desc">Mô tả</label>
        <textarea id="desc" {...register("moTa")} />
      </div>

      <div>
        <label htmlFor="startDate">Ngày khởi chiếu</label>
        <input type="date" id="startDate" {...register("ngayKhoiChieu")} />
      </div>

      <div>
        <label htmlFor="trailer">Trailer</label>
        <input type="text" id="trailer" {...register("trailer")} />
      </div>

      <div>
        <label htmlFor="image">Hình ảnh</label>
        {/* <input type="file" id="image" {...register("hinhAnh")} /> */}
        <input type="file" id="image" onChange={handleChangeImage} />
        {imgPreview && <img src={imgPreview} alt="preview" />}
      </div>

      <button>Submit</button>
    </form>
  );
}

export default AddMovie;

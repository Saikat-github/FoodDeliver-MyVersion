import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { assets } from '../../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify';


const Add = ({ url }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm();



  const selectedFile = watch("image")?.[0];

  React.useEffect(() => {
    let previewUrl;
    if (selectedFile) {
      previewUrl = URL.createObjectURL(selectedFile);
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedFile]);




  const onSubmitHandler = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("price", data.price)
      formData.append("category", data.category)
      formData.append("image", data.image[0])
      const response = await axios.post(`${url}/api/food/add`, formData)
      if (response.data.success) {
        reset();
        toast.success("Food item added successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='text-sm flex flex-col justify-center w-screen m-2 sm:my-6'>
      <h2 className='text-center text-2xl font-bold bg-gray-600 text-white mx-auto w-60 py-2 rounded-md mb-6'>Add Food Items</h2>
      <form className='flex flex-col gap-6 justify-center p-4' onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="add-img-upload">
          <p>Upload Image<span className='text-red-600'>*</span></p>
          <label htmlFor="image">
            <img src={selectedFile ? URL.createObjectURL(selectedFile) : assets.upload_area} alt="" className='w-1/3' />
          </label>
          <input onChange={(e) => {
            setValue("image", e.target.files)
          }} type="file" id='image' hidden {...register("image", { required: "Please upload an image of the product" })}
          />
          {errors.image && <p className='text-red-600 text-xs'>{errors.image.message}</p>}
        </div>

        <div className="add-product-name ">
          <p>Product Name<span className='text-red-600'>*</span></p>
          <input type="text" {...register("name", { required: "Product name is required" })} placeholder='Type here' className='w-2/3 md:w-1/2 border border-gray-400 p-1 rounded-sm' />
          {errors.name && <p className='text-red-600 text-xs'>{errors.name.message}</p>}
        </div>
        <div className="add-product-description">
          <p>Product Description<span className='text-red-600'>*</span></p>
          <textarea {...register("description", { required: "Write some description" })} rows="6" placeholder='Write content here' className='w-2/3 md:w-1/2 border border-gray-400 p-1 rounded-sm'></textarea>
          {errors.description && <p className='text-red-600 text-xs'>{errors.description.message}</p>}
        </div>
        <div className="add-category-price flex gap-6">
          <div className="add-category">
            <p>Product Category</p>
            <select {...register("category")} className='border border-gray-400 p-1 rounded-sm md:w-32 w-24'>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price">
            <p>Product Price<span className='text-red-600'>*</span></p>
            <input {...register("price", { required: "Price of the product is required", min: { value: 10, message: "Price must be at least ₹10" } })} type="Number" placeholder='₹20' className='border border-gray-400 p-1 rounded-sm md:w-32 w-24' />
            {errors.price && <p className='text-red-600 text-xs'>{errors.price.message}</p>}
          </div>
        </div>
        <button disabled={loading} type='Submit' className={`add-btn w-32 bg-black text-white py-2 rounded-sm hover:bg-opacity-90 transition-all duration-300 flex justify-center items-center gap-2 ${loading && "bg-opacity-70 hover:bg-opacity-70"}`}>Add {loading && <span className='h-4 w-4 border-4 border-dotted rounded-full border-white animate-spin'></span>}</button>
      </form>
    </div>
  )
}

export default Add
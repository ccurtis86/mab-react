import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css';

export default function Home() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter();
    const onSubmit = async(data) => {
        const response = await fetch('api/sluggable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const returnedJson = await response.json();

        router.push(`/${returnedJson.slug}`);

    }


  return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>

    <label htmlFor="userString">Your string slugging</label>
      {/* include validation with required or other standard HTML validation rules */}
      <textarea id="userString" {...register("userString", { required: true, minLength: 3 })} />
      {/* errors will return when field validation fails  */}
      {errors.userString && errors.userString.type === 'required' && <span>This field is required</span>}
      {errors.userString && errors.userString.type === 'minLength' &&  <span>Input must be longer than 3 characters</span>}

      <input type="submit" value="Create your snippet" />
    </form>
  );
}

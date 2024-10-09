'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { registerUser } from '@/actions';
import { setToken } from '@/utils/authHelpers';

type FormInputs = {
  name: string;
  lastName: string;
  email: string;
  password: string;
}


const schemaValidator: ZodType<FormInputs> = z.object({
  name: z.string().min(1, "No debe estar vacio").trim().min(1, "No puede tener espacios"),
  lastName: z.string().min(1, "No debe estar vacio").trim().min(1, "No puede tener espacios"),
  email: z.string().email("Debe ser un email valido"),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/, "La contraseña debe tener minimo 8 caracteres, al menos una letra y un numero"),
})

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormInputs>({ resolver: zodResolver(schemaValidator), defaultValues: { name: 'John', lastName: 'Smith', email: 'johndoe@gmail.com', password: 'Prueba123' } });
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');

    const { name, lastName, email, password } = data;

    // Server action
    try {
      const resp = await registerUser({ name, lastName, email, password });
      if (!resp) {
        setErrorMessage(resp.message);
        return;
      };
      setToken(resp.token);
      router.push('/');
    } catch (error) {
      console.log(error)
      setErrorMessage("Error al registrar el usuario");
      return;
    }


  }

  return (
    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl text-gray-900">Regístrate</h1>
        <p>Ingresa aqui tu información para registrarte</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex -mx-3">
          <div className="w-1/2 px-3 mb-5">
            <label htmlFor="" className="text-xs font-semibold px-1">Nombres</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={faUser} className="text-gray-400 text-lg"></FontAwesomeIcon></div>
              <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="John" {...register('name')} />
            </div>
              {
                errors.name?.message && (
                  <span className='-my-4 text-indigo-700'>{errors.name.message}</span>
                )
              }
          </div>
          <div className="w-1/2 px-3 mb-5">
            <label htmlFor="" className="text-xs font-semibold px-1">Apellidos</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={faUser} className="text-gray-400 text-lg"></FontAwesomeIcon></div>
              <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Smith" {...register('lastName')} />
            </div>
              {
                errors.lastName?.message && (
                  <span className='-my-4 text-indigo-700'>{errors.lastName.message}</span>
                )
              }
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={faEnvelope} className="text-gray-400 text-lg"></FontAwesomeIcon></div>
              <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" {...register('email')} />
          </div>
            </div>
              {
                errors.email?.message && (
                  <span className='-my-4 text-indigo-700'>{errors.email.message}</span>
                )
              }
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-12">
            <label htmlFor="" className="text-xs font-semibold px-1">Contraseña</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={faLock} className="text-gray-400 text-lg"></FontAwesomeIcon></div>
              <input type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" {...register('password')} />
            </div>
              {
                errors.password?.message && (
                  <span className='-my-4 text-indigo-700'>{errors.password.message}</span>
                )
              }
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
            <p className="text-xs text-center text-gray-500 mt-2">Ya tienes una cuenta? <Link href="/auth/login" className="text-indigo-500">Inicia sesión</Link></p>
            {
              errorMessage && (
                <span className="text-indigo-700">*{errorMessage}</span>
              )
            }
          </div>
        </div>
      </form>
    </div>
  );
}

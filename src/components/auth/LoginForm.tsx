'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { login } from '@/actions';
import { setToken } from '@/utils/authHelpers';
import { createTokenCookie } from '@/actions/cookies/token';

type FormInputs = {
  email: string;
  password: string;
}


const schemaValidator: ZodType<FormInputs> = z.object({
  email: z.string().email("Debe ser un email valido"),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/, "La contraseña debe tener minimo 8 caracteres, al menos una letra y un numero"),
})


export const LoginForm = () => {

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormInputs>({ resolver: zodResolver(schemaValidator), defaultValues: { email: 'prueba@gmail.com', password: 'Prueba123' } });
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');

    const { email, password } = data;

    // Server action
    const resp = await login({ email, password });
    if (!resp) {
      setErrorMessage(resp.message);
      return;
    };
    console.log(resp)
    setToken(resp.token);
    router.push('/')

  }


  return (
    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl text-gray-900">Inicia Sesión</h1>
        <p>Ingresa tus credenciales para acceder</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={faEnvelope} className="text-gray-400 text-lg"></FontAwesomeIcon></div>
              <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="ejemplo@dominio.com" {...register('email', { required: true })} />
              {
                errors.email?.message && (
                  <span className='-my-4 text-red-500'>{errors.email.message}</span>
                )
              }
            </div>
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-12">
            <label htmlFor="" className="text-xs font-semibold px-1">Contraseña</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={faLock} className="text-gray-400 text-lg"></FontAwesomeIcon></div>
              <input type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" {...register('password', { required: true })} />
              {
                errors.password?.message && (
                  <span className='-my-4 text-red-500'>{errors.password.message}</span>
                )
              }
            </div>
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">LOGIN</button>
            <p className="text-xs text-center text-gray-500 mt-2">¿No tienes una cuenta? <Link href="/auth/register" className="text-indigo-500">Regístrate</Link></p>
            {
              errorMessage && (
                <span className="text-red-500">*{errorMessage}</span>
              )
            }
          </div>
        </div>
      </form>
    </div>
  );
};

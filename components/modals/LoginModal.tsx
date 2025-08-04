'use client';

import { signIn } from 'next-auth/react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  // Hook que controla o estado (aberto/fechado) do modal
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // Estado para controlar o carregamento (usado para desabilitar botões e inputs enquanto envia o formulário)
  const [isLoading, setIsLoading] = useState(false);

  // Setup do formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Função executada ao enviar o formulário — data contém os valores preenchidos
  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then(callback => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  // Corpo do Modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div
        className="
        text-neutral-500
        text-center
        mt-4
        font-light
      "
      >
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already heave an account?</div>
          <div
            onClick={registerModal.onClose}
            className="
            text-neutral-800
            cursor-pointer
            hover:underline
          "
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  // Renderização do modal
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

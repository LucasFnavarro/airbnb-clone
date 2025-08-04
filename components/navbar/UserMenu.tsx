'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { User } from '@/app/generated/prisma';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  // Hook que controla abrir/fechar do modal de cadastro
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // isOpen: controla se o menu dropdown está aberto.
  const [isOpen, setIsOpen] = useState(false);

  // Função que alterna o menu aberto/fechado.
  // É memoizada com useCallback para evitar recriações desnecessárias em cada render — útil para performance, principalmente se a função for passada como prop.
  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
                  hidden
                  md:block
                  text-sm
                  font-semibold
                  py-3
                  px-4
                  rounded-full
                  hover:bg-neutral-100
                  transition
                  cursor-pointer
                  "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
            "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My Favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={() => {}} label="Airbnb my home" />
                <hr />
                <span className="text-rose-500">
                  <MenuItem onClick={() => signOut} label="Logout" />
                </span>
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

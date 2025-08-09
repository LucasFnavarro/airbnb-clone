'use client';

import { Reservation } from '@/app/generated/prisma';
import useCountries from '@/hooks/useCountries';
import { SafeListing, SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(() => {
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); // Impede que o clique propague para elementos pai

      if (disabled) return; // Se estiver desabilitado, não faz nada

      onAction?.(actionId); // Executa a função passada com o ID da ação
    };
  }, [onAction, actionId, disabled]);

  // Define o preço mostrado: se for reserva, mostra total da reserva; senão, o preço do anúncio
  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  // Formata e retorna a data da reserva (início - fim)
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
        col-span-1 cursor-pointer group
    "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
           
        "
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
                object-cover
                h-full
                w-full
                group-hover:scale-110
                transition
            "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500 text-sm">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            R${' '}
            {price.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="">
            {!reservation && <div className="font-light">por noite</div>}
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;

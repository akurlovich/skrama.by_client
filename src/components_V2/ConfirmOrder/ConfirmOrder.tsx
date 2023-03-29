import React, { FC, useState } from 'react';
import './confirmorder.scss';
import { TextField } from '@fluentui/react/lib/TextField';
import { useNavigate } from 'react-router-dom';
import EmailService from '../../services/EmailService';
import { ICartItem } from '../../types/ICartItem';

interface IProps {
  setModal: (bol: boolean) => void;
  onClickClear?: () => void;
  items: ICartItem[];
  short?: boolean;
  long?: boolean;
}

const ConfirmOrderInner: FC<IProps> = ({setModal, onClickClear, items, short, long}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  
  const confirmHandler = async () => {
    alert('Заказ оформлен!');
    // console.log(items)
    await EmailService.sendEmail({
      name,
      phone,
      email,
      address, 
      items
    });
    setModal(false);
    navigate('/');
    onClickClear && onClickClear();
  };

  const canselOrderHandler = () => {
    if (long) {
      onClickClear && onClickClear();
    }
    setModal(false);
  }

  const nameHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setName(newValue || '');
  };

  const phoneHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setPhone(newValue || '');
  };

  const emailHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setEmail(newValue || '');
  };

  const addressHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setAddress(newValue || '');
  };

  return (
    <div className='confirmorder__wrapper'>
      <div className="confirmorder__container">
        <div className="confirmorder__title">
          {!short ? `Подтверждение заказа` : 'Заказ консультации'}
        </div>
        <div className="confirmorder__inputs">
          <TextField 
            value={name}
            onChange={nameHandler}
            label="Имя:" 
            required
            underlined 
            size={100}
            // placeholder="Введите Ваше имя" 
          />
          {!short &&
            <TextField 
              value={email}
              onChange={emailHandler}
              label="E-mail:" 
              // required
              underlined  
              // placeholder="Введите Вашу фамилию" 
            />

          }
            
          <TextField 
            value={phone}
            onChange={phoneHandler}
            label="Телефон:" 
            required
            underlined  
            // placeholder="Введите Ваш телефон" 
          />
          {!short &&
            <TextField 
              value={address}
              onChange={addressHandler}
              label="Адрес доставки:" 
              // required
              underlined  
              // placeholder="Введите Ваш адрес доставки" 
            />

          }

        </div>
        <div className="confirmorder__buttons">
          <button
            onClick={canselOrderHandler} 
            className="btn btn-secondary btn-lg">
            Отмена
          </button>
          <button
            onClick={confirmHandler}
            className="btn btn-primary btn-lg">
            Подтвердить
          </button>
          {/* <DefaultButton 
            onClick={() => setModal(false)}
            text="Отмена"
          />
          <PrimaryButton 
            onClick={confirmHandler}
            text="Подтвердить"
          /> */}
        </div>
      </div>
    </div>
  )
}

export const ConfirmOrder = React.memo(ConfirmOrderInner)
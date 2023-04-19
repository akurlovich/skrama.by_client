import { CommandBarButton, IIconProps, initializeIcons, TextField } from '@fluentui/react';
import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import base64 from '../../../services/ClientServices/Base64';
import { addProductColor } from '../../../store/reducers/ColorReducer/ColorActionCreaters';
import { addType } from '../../../store/reducers/TypeReducer/TypeActionCreators';
import { ITypeResponse } from '../../../types/ITypeResponse';
import { SelectOption } from '../../UI/SelectOption';

interface IProps {
  types: ITypeResponse[],
};

initializeIcons();

const addIcon: IIconProps = { iconName: 'Add' };


const AddProductImagesInner: FC<IProps> = ({types}) => {
  const { error } = useAppSelector(state => state.colorsReducer);
  const dispatch = useAppDispatch();
  const [typeID, setTypeID] = useState('');
  const [productID, setProductID] = useState('');
  const [title, setTitle] = useState('');
  const [showImg, setShowImg] = useState('');
  const [coverImage, setcoverImage] = useState<File | null>(null);

  const showTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeID(event.target.value);
  }
  const productIDHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setProductID(newValue || '');
  };

  const titleHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setTitle(newValue || '');
  };

  const imageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (event.currentTarget.files as FileList)[0];
    setcoverImage(file);
    const urlImage = await base64(file);
    setShowImg(urlImage as string);
  };

  const imageAddHandler = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('typeID', typeID);
    formData.append('productID', productID);
    formData.append('coverImage', coverImage as File);

    if (title && typeID && productID && coverImage) {
      await dispatch(addProductColor(formData));
      if (!error) {
        alert(`Картинка (цвет) добавлена!`);
        setTitle('');
        setTypeID('');
        setProductID('');
        setcoverImage(null);
        setShowImg('');
      } else {
        alert(`Что-то пошло не так! ${error}`)
      }
    } else {
      alert(`Не все поля заполнены`)
    }
  };

  return (
    <div className='addproduct__infotype'>
      <div>Добавление картинки (цвета)</div>
      <SelectOption label='Тип' value={typeID} onChangeHandler={showTypeHandler} optionArray={types}/>
      <TextField 
        value={productID}
        onChange={productIDHandler}
        label="ID продукта:" 
        underlined  
        placeholder="Введите ID" 
      />
      <TextField 
        value={title}
        onChange={titleHandler}
        label="Название картинки (цвета):" 
        underlined  
        placeholder="Введите название" 
      />
      <div className="inputs__files">
        <div className="inputs__files_block">
          <div className="inputs__files__title">
            Изображение:
          </div>
          <input
            onChange={imageHandler}
            className='inputs__files_display' type="file" name="label_for_file" id="label_for_file" />
          <label className='inputs__files__label' htmlFor="label_for_file">Виберите файл</label>
        </div>
        <div className="inputs__files__view">
          <img  className='inputs__files__view_img' src={showImg} alt='эскиз'/>
        </div>
      </div>
      <CommandBarButton
        iconProps={addIcon}
        text="Добавить картинку (цвет)"
        onClick={imageAddHandler}
      />
    </div>
  )
};

export const AddProductImages = React.memo(AddProductImagesInner);
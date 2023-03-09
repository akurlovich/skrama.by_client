import { CommandBarButton, IIconProps, initializeIcons } from '@fluentui/react';
import React, { FC, useState } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { useAppDispatch } from '../../../hooks/redux';
import { ITypeResponse } from '../../../types/ITypeResponse';
import { SelectOption } from '../../UI/SelectOption';
import { addType } from '../../../store/reducers/TypeReducer/TypeActionCreators';

interface IProps {
  types: ITypeResponse[],
};

initializeIcons();

const addIcon: IIconProps = { iconName: 'Add' };

const AddProductTypeInner: FC<IProps> = ({types}) => {
  const [typeID, setTypeID] = useState('');
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');

  const showTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeID(event.target.value);
  }
  const titleHandler = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setTitle(newValue || '');
  };

  const typeHandler = async () => {
    await dispatch(addType({name: title, coverImage: ' '}));
    alert('Тип добавлен!');
  };

  return (
    <div className='addproduct__infotype'>
      <SelectOption label='Показать все' value={typeID} onChangeHandler={showTypeHandler} optionArray={types}/>
      <TextField 
        value={title}
        onChange={titleHandler}
        label="Добавить Тип:" 
        underlined  
        placeholder="Введите тип" 
      />
      <CommandBarButton
        iconProps={addIcon}
        text="Добавить тип"
        onClick={typeHandler}
      />
    </div>
  )
}

export const AddProductType = React.memo(AddProductTypeInner)
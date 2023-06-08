import { CommandBarButton, IIconProps, initializeIcons } from '@fluentui/react';
import React, { FC } from 'react';
import './adminbtns.scss';

initializeIcons();

const deleteIcon: IIconProps = { iconName: 'Cancel' };
const editIcon: IIconProps = { iconName: 'Edit' };

interface IProps {
  updateProductHandler: () => void;
  deleteProductHandler: () => void;
}

const AdminBtnsInner: FC<IProps> = ({updateProductHandler, deleteProductHandler}) => {

  return (
    <div className="picketfenceinfo__title_btns">
      <CommandBarButton
        iconProps={editIcon}
        text="Изменить цену"
        onClick={updateProductHandler}
      />
      <CommandBarButton
        iconProps={deleteIcon}
        text="Удалить"
        onClick={deleteProductHandler}
      />
    </div>
  )
}

export const AdminBtns = React.memo(AdminBtnsInner);
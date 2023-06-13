import React, { FC } from 'react';

interface IProps {
  label: string,
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  warning: boolean,
}

const PocketFenceInfoInputInner: FC<IProps> = ({label, onChangeHandler, value, warning}) => {
  return (
    <div className="picketfenceinfo__inputs__item">
      <input
        className={warning ? 'warning_item' : ''}
        onChange={onChangeHandler}
        value={value}
        type="number"
        name="input_long"
        id="input_long"
        required
      />
      <label style={warning ? {color: "red"} : {}} htmlFor="input_long">{label}</label>
    </div>
  )
}

export const PocketFenceInfoInput = React.memo(PocketFenceInfoInputInner);
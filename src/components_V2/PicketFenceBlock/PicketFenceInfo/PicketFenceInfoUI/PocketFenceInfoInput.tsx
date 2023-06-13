import React, { FC } from 'react';

interface IProps {
  label: string,
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
}

const PocketFenceInfoInputInner: FC<IProps> = ({label, onChangeHandler, value}) => {
  return (
    <div className="picketfenceinfo__inputs__item">
      <input
        onChange={onChangeHandler}
        value={value}
        type="number"
        name="input_long"
        id="input_long"
        required
      />
      <label htmlFor="input_long">{label}</label>
    </div>
  )
}

export const PocketFenceInfoInput = React.memo(PocketFenceInfoInputInner);
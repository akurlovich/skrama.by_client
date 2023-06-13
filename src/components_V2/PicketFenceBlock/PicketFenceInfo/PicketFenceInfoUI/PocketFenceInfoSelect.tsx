import React from 'react';

interface IProps {
  label: string,
  selectedColor: string,
  isOpenColors: boolean,
  setSelectedColor: (data: string) => void,
  setIsOpenColors: () => void,
  optionArray: { title: string; name: string; color: string; }[],
}

const PocketFenceInfoSelectInner = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  return (
    <div className="picketfenceinfo__inputs__item">
      <div
        ref={ref}
        onClick={props.setIsOpenColors}
        className="selected_colors">
          <div className="picketfenceinfo__addinfo__selectedcolor">
            {props.selectedColor}
          </div>
          {props.isOpenColors &&
            <div className="picketfenceinfo__addinfo__secondary colorsblock">
              {props.optionArray.map(item => 
                <div 
                  onClick={() => props.setSelectedColor(item.title)}
                  key={item.title} 
                  className="picketfenceinfo__colorselect">
                  <div
                    style={{backgroundColor: item.color}}
                    className="picketfenceinfo__colorselect__img"></div>
                  <div className="picketfenceinfo__colorselect__text">
                    {item.title}
                  </div>
                </div>  
              )}
            </div>
          }
      </div>
      <div className={props.selectedColor ? 'for_selected_colors active_color' : 'for_selected_colors'} >{props.label}</div>
    </div>
  )
})

export const PocketFenceInfoSelect = React.memo(PocketFenceInfoSelectInner);
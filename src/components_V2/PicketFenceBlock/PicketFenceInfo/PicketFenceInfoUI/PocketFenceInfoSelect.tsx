import React from 'react';

interface IProps {
  label: string,
  selectedColor: string,
  isOpenColors: boolean,
  warning: boolean,
  setSelectedColor: (data: string) => void,
  setIsOpenColors: () => void,
  setWarning: () => void,
  optionArray: { title: string; name: string; color: string; }[],
}

const PocketFenceInfoSelectInner = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const onClickHandler = (title: string) => {
    props.setSelectedColor(title);
    props.setWarning();
  };

  return (
    <div className="picketfenceinfo__inputs__item">
      <div
        ref={ref}
        onClick={props.setIsOpenColors}
        className={props.warning ? "selected_colors warning_item" : "selected_colors"}>
          <div className="picketfenceinfo__addinfo__selectedcolor">
            {props.selectedColor}
          </div>
          {props.isOpenColors &&
            <div className="picketfenceinfo__addinfo__secondary colorsblock">
              {props.optionArray.map(item => 
                <div 
                  onClick={() => onClickHandler(item.title)}
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
      <div style={props.warning ? {color: "red"} : {}} className={props.warning ? 'for_selected_colors warning_item' : (props.selectedColor ? 'for_selected_colors active_color' : 'for_selected_colors')} >{props.label}</div>
    </div>
  )
})

export const PocketFenceInfoSelect = React.memo(PocketFenceInfoSelectInner);
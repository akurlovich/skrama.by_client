import React, { FC } from 'react'
import './typecard.scss'
// @ts-ignore
// import avatar from '../../assets/img/main_img4.jpg'

interface IProps {
  title: string;
	text?: string;
  linkTo?: string;
  imgSrc?: string;
};

const TypeCardInner: FC<IProps> = ({title, text, linkTo, imgSrc}) => {
	return (
		<div className='typecard'>
			<div className="typecard__wrapper">
				<div className="typecard__image">
					<img src={imgSrc}/>
				</div>
				<div className="typecard__title">
					<h2>{title}</h2>
					<h3>{text}</h3>
				</div>
				<button className="typecard__button">
					Выбрать
				</button>

			</div>
		</div>
	)
}

export const TypeCard = React.memo(TypeCardInner)
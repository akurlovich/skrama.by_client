import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import './typecard.scss'

interface IProps {
  title: string;
	text?: string;
  linkTo: string;
  imgSrc?: string;
};

const TypeCardInner: FC<IProps> = ({title, text, linkTo, imgSrc}) => {
	const navigate = useNavigate();

	return (
		<div className='typecard'>
			<div className="typecard__card">
				<div className="typecard__card__image">
					<img src={imgSrc}/>
				</div>
				<div className="typecard__card__title">
					<h2>{title}</h2>
					<h3>{text}</h3>
				</div>
				<button 
					className="typecard__card__button"
					onClick={() => navigate(`/${linkTo}`)}
				>
					Выбрать
				</button>

			</div>
		</div>
	)
}

export const TypeCard = React.memo(TypeCardInner)
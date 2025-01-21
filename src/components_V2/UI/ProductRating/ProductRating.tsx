import React, { FC } from 'react'
import './productrating.scss'
// @ts-ignore
import starRatingSvg from '../../../assets/img/star_rating.png';

interface IProps {
	views: number
	phone?: boolean
}

const ProductRatingInner: FC<IProps> = ({views, phone = false}) => {
	return (
		<div className={phone ? "productrating__wrapper_phone" : "productrating__wrapper"}>
			<img src={starRatingSvg} alt='star'/>
			<img src={starRatingSvg} alt='star'/>
			<img src={starRatingSvg} alt='star'/>
			<img src={starRatingSvg} alt='star'/>
			<img src={starRatingSvg} alt='star'/>
			<div className="productrating__block">
				Просмотров: {views} 
			</div>
		</div>
	)
}

export const ProductRating = React.memo(ProductRatingInner)
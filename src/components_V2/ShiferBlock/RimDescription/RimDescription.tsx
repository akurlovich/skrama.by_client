import React, { FC } from 'react'

const RimDescriptionInner: FC = () => {
	return (
		<>
			<p><strong>Лист "Римская волна" (шифер) толщиной 5.8мм хризотилцементный.</strong></p>
			<p><strong>Размер листа 1,75*0,98 метра,</strong> прекрасно подходит для кровли,заборов, ограждений.</p>
			<p>Цена за лист площадью 1,715м2.</p>
			<p>Посмотреть вы можете у нас <strong>на складе</strong>  с 8.00 до 19.00 по адресу: ул. П.Глебки 11, Минск ( район метро Спортивная, Каменная горка).</p>
		</>
)
}

export const RimDescription = React.memo(RimDescriptionInner)
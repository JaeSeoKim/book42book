import React from "react";
import tw from "twin.macro"
import Objbook from "./Objbook"

const Objlist = ({ status, data }) => {
	return (<>
		<div>
			<span>{status} 목록</span>
			<ul>
				{Datas.map((data) => (
					<Objbook name={data}/>
				))}
			</ul>
		</div>
	</>)
}

export defaul Objlist

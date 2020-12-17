import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import tw from "twin.macro";

const LayoutHome = ({ children, search, bookreturn, bookrent }) => {
	return (
		<Container>
			<Row css={tw`flex content-center`}>
				<img css={tw`mx-auto`} src="https://user-images.githubusercontent.com/35288028/102369452-4adadd80-3fff-11eb-8cff-7f79e133972e.png" />
			</Row>
			<Row>
				<Col sm="12" md={{ size: 6, offset: 3 }}>
					{search}
				</Col>
			</Row>
			<Row>
				<Col>{bookreturn}</Col>
				<Col>{bookrent}</Col>
			</Row>
		</Container>
	);
}

export default LayoutHome

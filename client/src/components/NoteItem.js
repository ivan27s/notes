import React from 'react'
import { Card,CardBody,CardTitle, CardText,Button, Col} from 'reactstrap';

    export const NoteItem =(props)=> {
        return (
        <Col sm="4">
        <Card className=".card mt-2">
            <CardBody>
                <CardTitle>
                    <strong>{props.title}</strong>
                    <Button close onClick={()=>props.closeClick(props.id)}/>
                </CardTitle>
                <CardText>{props.text}</CardText>
            </CardBody>
        </Card>
        </Col>
    )
}
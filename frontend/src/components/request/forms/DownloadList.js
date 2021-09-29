import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Table, Row, InputGroup, FormControl, Container, Button } from 'react-bootstrap'


const DownloadList = () => {
    return (
        <Fragment>
            <Container>
                <div id="rectangle" >
                    <h3>FORMS</h3>
                </div>
            </Container>
            <Container fluid style={{ paddingTop: '38px' }}>
                <Table bordered striped hover size="sm" style={{ paddingTop: '100px', marginTop: '50px', justifyContent: 'center' }}>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Document Name</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>

                       
                    </tbody>
                </Table>
            </Container>
            <Container className="space"></Container>
        </Fragment>
    )
}

export default DownloadList
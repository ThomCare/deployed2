import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Table, Row, InputGroup, FormControl, Container, Button } from 'react-bootstrap'


const FormsList = () => {
    return (
        <Fragment>
            <Container>
                <div id="rectangle" >
                    <h3>FORMS</h3>
                </div>
            </Container>
            <Container fluid style={{ paddingTop: '38px' }}>
                <Table bordered striped size="sm" style={{ paddingTop: '100px', marginTop: '50px', justifyContent: 'center' }}>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Document Code</th>
                            <th>Document Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        <tr>
                            <td>Form 6A</td>
                            <td>Adding/Dropping of course</td>
                            <td>
                                <Link to='/forms/form-6a'>
                                    <Button variant="primary" style={{margin: '5px'}}>
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Fill out
                                    </Button>
                                </Link>
                                <Button variant="warning" href="https://drive.google.com/file/d/1T5FATdMcVEhhTsfrqkEOKudhWF7rkvE_/view?usp=sharing" target="_blank"  style={{margin: '5px'}}>
                                    <i class="fa fa-eye" aria-hidden="true"></i> View
                                </Button>
                            </td>
                        </tr>
                       
                    </tbody>
                </Table>
            </Container>
            <Container className="space"></Container>
        </Fragment>
    )
}

export default FormsList
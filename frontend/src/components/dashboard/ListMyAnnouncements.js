import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getMyAnnouncements, deleteAnnouncement, archiveAnnouncement, clearErrors } from './../../actions/announcementActions'
import { ARCHIVE_ANNOUNCEMENT_RESET, DELETE_ANNOUNCEMENT_RESET } from './../../constants/announcementConstants'
import Sidebar from './../layout/Sidebar'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'

var dateFormat = require('dateformat')

const ListMyAnnoucements = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcements, error } = useSelector(state => state.announcements)
    const { error: deleteError, isDeleted, isUpdated } = useSelector(state => state.announcement)

    const [show, setShow] = useState(false);
    const [deleteAnnouncementId, setDeleteAnnouncementId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getMyAnnouncements())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Announcement has been deleted successfully.')
            history.push('/admin/announcements')

            dispatch({
                type: DELETE_ANNOUNCEMENT_RESET
            })
        }

        if (isUpdated) {
            alert.success('Announcement has been archived successfully.')
            history.push('/admin/announcements')

            dispatch({
                type: ARCHIVE_ANNOUNCEMENT_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, isDeleted, isUpdated, deleteError])

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    const deleteAnnouncementHandler = (id) => {
        dispatch(deleteAnnouncement(id))
        handleClose()
    }

    const setAnnouncements = () => {

        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'date',
                    width: 100
                },
                {
                    label: 'Title',
                    field: 'title',
                    width: 150
                },
                {
                    label: 'Description',
                    field: 'description',
                    width: 300
                },
                {
                    label: 'Tags',
                    field: 'tags',
                    width: 180
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 150
                }
            ],
            rows: []
        }

        announcements.forEach(announcement => {
            data.rows.push({
                date: changeDateFormat(announcement.createdAt),
                title: announcement.title,
                description: announcement.description,
                tags: <Fragment>
                    <span>
                        <p style={{ margin: '0' }}><b>Year Level: </b>{announcement.yearLevel}</p>
                        <p style={{ margin: '0' }}><b>Course: </b>{announcement.course}</p>
                        <p style={{ margin: '0' }}><b>Track: </b>{announcement.track}</p>
                    </span>
                </Fragment>,
                actions: <Fragment>
                    <Link to={`/admin/announcement/${announcement._id}`}>
                        <Button variant="primary" className="mr-5" style={{ margin: '5px' }}>
                            <i class="fa fa-pencil" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                        </Button>
                    </Link>
                    <Button variant="warning" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                        dispatch(archiveAnnouncement(announcement._id))
                    }}>
                        <i class="fa fa-archive" aria-hidden="true" />
                    </Button>
                    <Button variant="danger" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                        handleShow()
                        setDeleteAnnouncementId(announcement._id)
                    }}>
                        <i class="fa fa-trash" aria-hidden="true" />
                    </Button>
                </Fragment>
            })

        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Announcements'} />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this announcement?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This change cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteAnnouncementHandler(deleteAnnouncementId)}>Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container className="space_inside"></Container>
                    <Container>
                        <h3>Announcements</h3>
                        <Button variant="primary"><Link to='/admin/new/announcement' style={{ textDecoration: 'none', color: 'white' }}>Create announcement</Link></Button>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setAnnouncements()}
                                    searchTop
                                    pagingTop
                                    scrollX
                                    entriesOptions={[5, 20, 25]}
                                    entries={10}
                                />
                            </>
                        )}
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default ListMyAnnoucements

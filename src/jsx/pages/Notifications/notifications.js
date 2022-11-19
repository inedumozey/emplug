import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import CustomNav from '../../layouts/nav/CustomNav'
import { ThumbsUp, Checks } from 'phosphor-react'
import {
  initNotifications,
  fetchNotifications,
} from '../../../store/actions/notifications/NotificationAction'

const Notifications = ({
  auth: { auth },
  fetchNotifications,
  notifications: { allNotifications, loaded },
}) => {
  const [read, setRead] = useState([])
  const [cusNotifications, setCusNotifications] = useState([])

  useEffect(() => {
    fetchNotifications(auth.token, auth.user._id)
  }, [loaded])

  useEffect(() => {
    loaded && setCusNotifications(allNotifications)
  }, [loaded])

  const handleRead = (id) => {
    setRead((prev) => [...prev, id])
  }

  return (
    <>
      <CustomNav />
      <div className='container'>
        <div className='card shadow mt-3'>
          <div className='border-bottom'>
            <h2 className='text-muted '>
              Notifications
            </h2>
          </div>
          <section className='mt-3 overflow-auto' style={{ height: '70vh' }}>
            {cusNotifications.length > 0 ? (
              cusNotifications.map((noti, i) => (
                <div key={i} className='row align-items-top my-3'>
                  <div
                    className='col-auto fs-3 text-muted'
                    style={{ cursor: 'pointer' }}
                    title='Visit link'
                  >
                    #
                  </div>
                  <div className='col'>
                    <h6
                      className={`mb-0 ${
                        read.includes(noti._id) ? 'text-muted' : ''
                      }`}
                    >
                      {noti.message}
                    </h6>
                    <p className='text-muted my-1'>{`${new Date(
                      noti.createdAt
                    ).getDate()}/${new Date(
                      noti.createdAt
                    ).getMonth()}/${new Date(
                      noti.createdAt
                    ).getFullYear()} - ${new Date(
                      noti.createdAt
                    ).getHours()} : ${new Date(
                      noti.createdAt
                    ).getMinutes()}`}</p>
                  </div>
                  <div className='col d-flex justify-content-center'>
                    <div
                      className={`btn btn-link border-start ${
                        read.includes(noti._id) ? 'text-muted' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRead(noti._id)}
                    >
                      <Checks size={20} /> Mark as read
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center text-muted'>
                <p>NO NOTIFICATIONS</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  organisation: state.organisation,
  notifications: state.notifications,
})

const mapDispatchToProps = (dispatch) => ({
  fetchNotifications: (token, id) => dispatch(fetchNotifications(token, id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)

const sticky = {
  position: '-webkit-sticky',
  position: 'sticky',
  top: 120,
}

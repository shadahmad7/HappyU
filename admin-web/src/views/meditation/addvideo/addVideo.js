import React, { useEffect, useState } from 'react'
import { CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import { DocsExample } from 'src/components'
import './addVideo.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CSpinner,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'


let baseUrl = 'https://www.youtube.com/watch?v='
let array = []

const addVideo = () => {
  const [data, setData] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const [length, setLength] = React.useState('')
  const [msg, setMsg] = React.useState('')

  React.useEffect(() => {

    loadAll();
  }, [])


  const loadAll = async () => {
    setLoading(true)
    console.log('LKJKL', loading)
    const url = 'getAllMeditationVideo'
    await fetch(url)
      //  const res =  await fetch('getAllWorkoutVideo')
      .then((results) => results.json())
      .then((resData) => {
        array = resData.messages
        console.log('LKJKL', array)
      })
      setLoading(false)
  }


  const onDelete = async (id) => {
    console.log('KKKKK', id);
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Cookie', 'mode=day')

    var raw = JSON.stringify({
      id
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    await fetch('deleteMeditationVideo', requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))

    await loadAll();
  }



  const youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);

    return (match&&match[7].length==11)? match[7] : false;
}

  const submit = async () => {
    let a = url;
    a =  youtube_parser(a);
    console.log('KKKKK', a, length)
    if(a === false ){
      console.log("Inavlid");
      setMsg("Invalid Url");
    } else {
    setVisible(false)
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Cookie', 'mode=day')

    var raw = JSON.stringify({
      "url":a,
      length,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    await fetch('addMeditationVideo', requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))

    setUrl('')
    setLength('')
    await loadAll();
  }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="addButton">
              <strong>Videos</strong>
              <CButton onClick={() => setVisible(!visible)}>Add New</CButton>
            </div>

            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
              <CModalHeader>
                <CModalTitle>Add New Video</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Video Url</CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      value={url}
                      onInput={(e) => setUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=abcc"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormSelect
                      size="sm"
                      className="mb-3"
                      aria-label="Small select example"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    >
                      <option>Select Duration</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                    </CFormSelect>
                  </div>
                </CForm>
                {msg.length > 0 && (
                  <div className="error-msg">
                    {msg}
                    </div>
                )}
              </CModalBody>

              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Cancel
                </CButton>
                <CButton color="primary" onClick={submit}>
                  Save
                </CButton>
              </CModalFooter>
            </CModal>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div className="loader">
                <CSpinner />
              </div>
            ) : (
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>URL</CTableHeaderCell>
                    <CTableHeaderCell>Duration</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {array.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">{index+1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">
                          <a target="_blank" href={baseUrl + item.meditation_video_url}>
                            https://www.youtube.com/watch?v={item.meditation_video_url}
                          </a>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">
                          {item.meditation_video_duration}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="trash" onClick={() => onDelete(item.meditation_video_id)}>
                        <CIcon icon={cilTrash} size="lg" color="red"/>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default addVideo

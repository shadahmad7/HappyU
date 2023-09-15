import React, { useEffect, useState } from 'react'
import { CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
import { DocsExample } from 'src/components'
import './addArticle.css'
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

const addArticle = () => {
  const [data, setData] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const [name, setName] = React.useState('')
  const [pic, setPic] = React.useState(null)

  React.useEffect(() => {

    loadAll();
  }, [])


  const loadAll = async () => {
    setLoading(true)
    console.log('LKJKL', loading)
    const url = 'getKindnessArticles'
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

    await fetch('deleteKindnessArticle', requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))

    await loadAll();
  }



  const submit = async () => {
    console.log('KKKKK', url, name, pic);
    setVisible(false)

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Cookie', 'mode=day')

    var raw = JSON.stringify({
      name,
      url,
      "image":pic
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    await fetch('addKindnessArticle', requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))

    setUrl('')
    setName('')
    setPic('')
    await loadAll();
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="addButton">
              <strong>Articles</strong>
              <CButton onClick={() => setVisible(!visible)}>Add New</CButton>
            </div>

            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
              <CModalHeader>
                <CModalTitle>Add New Article</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Article Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      value={name}
                      onInput={(e) => setName(e.target.value)}
                      placeholder="New Article"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Article Url</CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      value={url}
                      onInput={(e) => setUrl(e.target.value)}
                      placeholder="Article Url"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Article Image Link</CFormLabel>
                    <CFormInput
                      type="text"
                      id="exampleFormControlInput1"
                      value={pic}
                      onInput={(e) => setPic(e.target.value)}
                      placeholder="Article Image Link"
                    />
                  </div>

                </CForm>
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
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>URL</CTableHeaderCell>
                    <CTableHeaderCell>Image</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {array.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">{index +1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">{item.kindness_article_name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">
                          <a target="_blank" href={item.kindness_article_url}>
                            {item.kindness_article_url}
                          </a>
                        </div>
                      </CTableDataCell>
                      <div className="small text-medium-emphasis">
                          <img src={item.kindness_article_image} alt="img" width="50" height="50" />
                        </div>
                        <CTableDataCell>
                        <div className="trash" onClick={() => onDelete(item.kindness_article_id)}>
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

export default addArticle
